<script setup>
import { ref } from "vue";

import TheCameraRig from "./TheCameraRig.vue";
import SkiDoor from "./SkiDoor.vue";
import Scoreboard from "./Scoreboard.vue";
import "../aframe/bind-rotation.js";
import "../aframe/bind-position.js";
import "../aframe/chronometer.js";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/storeRead.js";
import { randomNb } from "../utils/randomNb.js";
import Teleporter from "./Teleporter.vue";

defineProps({
  scale: Number,
  overlaySelector: String,
});

const allAssetsLoaded = ref(false);
const nbDoors = 8;
const nbTree = 70;
const nbRock = 20;
const doorsPosition = ["0 0 0", "0 0 4"];

let animationStart = false;
//query

const head = document.querySelector("#head");

setTimeout(() => {
  plantTree();
  plantRock();
}, 500);

function setPositions() {
  const position = document
    .querySelector(`.door-${nbDoors - 1}`)
    .getAttribute("position");

  console.log(`${position.x} 0 ${position.z}`);
  const scoreboard = document.querySelector("#scoreboard-end");

  const scoreboardPosition = `${position.x - 4} 0 ${position.z - 8}`;
  scoreboard.setAttribute("position", scoreboardPosition);
  scoreboard.setAttribute("visible", "true");

  const teleporterPosition = `${position.x + 4} 0 ${position.z - 12.3}`;
  const teleporter = document.querySelector("#teleporter");
  const penguinArmy = document.querySelector("#penguin-army");
  const penguinPosition = `${position.x - 6} 0 ${position.z - 4}`;
  teleporter.setAttribute("position", teleporterPosition);
  teleporter.setAttribute("visible", "true");

  penguinArmy.setAttribute("position", penguinPosition);
  penguinArmy.setAttribute("rotation", "0 60 0");
  penguinArmy.setAttribute("visible", "true");

  doorsPosition.push(`${position.x - 4} 0 ${position.z - 12.3}`);
  doorsPosition.push(teleporterPosition);
  doorsPosition.push(penguinPosition);
}

function getDoorPosition(index) {
  if (index === 0) {
    doorsPosition.push("0 0 -5");
    return `0 0 -5`;
  }
  const x = randomNb(-13, 13);
  const z = index * -15 + randomNb(-2, 2);
  doorsPosition.push(`${x} 0 ${z}`);
  return `${x} 0 ${z}`;
}

function plantTree() {
  for (let i = 0; i < nbTree; i++) {
    const tree = document.createElement("a-entity");
    tree.setAttribute("gltf-model", "#tree-asset");

    const x = randomNb(-25, 25);
    const z = randomNb(-150, 25);
    const scale = randomNb(3, 13) / 1000;
    tree.setAttribute("position", `${x} 0 ${z}`);
    tree.setAttribute("scale", `${scale} ${scale} ${scale}`);

    if (checkIfNothing(x, z)) {
      document.querySelector("a-scene").appendChild(tree);
    }
  }
}

function plantRock() {
  for (let i = 0; i < nbRock; i++) {
    const rock = document.createElement("a-entity");
    rock.setAttribute("gltf-model", "#rock-asset");

    const x = randomNb(-25, 25);
    const z = randomNb(-150, 25);
    const rotation = randomNb(0, 180);
    const scale = randomNb(50, 150) / 100;
    rock.setAttribute("position", `${x} 0 ${z}`);
    rock.setAttribute("scale", `${scale} ${scale} ${scale}`);
    rock.setAttribute("rotation", `0 ${rotation} 0`);

    if (checkIfNothing(x, z)) {
      document.querySelector("a-scene").appendChild(rock);
    }
  }
}

function checkIfNothing(x, z) {
  let checked = true;
  doorsPosition.forEach((pos) => {
    pos = pos.split(" ");
    const diffX = x - pos[0];
    const diffZ = z - pos[2];

    if (diffX < 5 && diffX > -5 && diffZ < 5 && diffZ > -5) {
      console.log("too close");
      checked = false;
    }
  });

  return checked;
}

let doorPassedCount = 0;

function doorPassed(index) {
  doorPassedCount++;
  console.log("door passed", doorPassedCount);
  if (index === 0) {
    firstDoorPassed();
  } else if (index === nbDoors - 1) {
    lastDoorPassed();
  }
}

function firstDoorPassed() {
  setPositions();
  doorPassedCount = 1;
  document.querySelectorAll(".door-timer").forEach((el) => {
    if (el.getAttribute("chronometer")) {
      el.removeAttribute("chronometer");
    }
    el.setAttribute("chronometer", "");
  });
}

function lastDoorPassed() {
  console.log("doorPassedCount", doorPassedCount);
  console.log("nbDoors", nbDoors);
  if (doorPassedCount < nbDoors) return;
  console.log("last door passed");
  document.querySelectorAll(".door-timer").forEach((el) => {
    el.setAttribute("chronometer", "stop", "true");
  });
  handleScore();
  const penguinArmy = document.querySelector("#penguin-army");
  penguinArmy.setAttribute(
    "sound",
    "src: url(assets/sound3.mp3); autoplay: true"
  );
}

function handleScore() {
  const myScore = document.querySelector(".door-timer").getAttribute("value");

  const scoreboard = getFromLocalStorage("scoreboard");
  console.log("myScore", myScore);
  if (myScore < scoreboard[2]) {
    scoreboard.push(myScore);
    scoreboard.sort();
    scoreboard.splice(3, 1);
    saveToLocalStorage("scoreboard", scoreboard);
  }
  const newScoreboard = getFromLocalStorage("scoreboard");
  const scoreboardText = document.querySelectorAll(".scoreboard-text");

  scoreboardText.forEach((el) => {
    el.setAttribute(
      "value",
      `1:\t${newScoreboard[0]}\n2:\t${newScoreboard[1]}\n3:\t${newScoreboard[2]}\nVotre score: ${myScore}`
    );
  });
}

const rightBoxes = {
  top: ref(0),
  bottom: ref(0),
  delta: ref(0),
};

const rightTopTime = ref(0);
const rightTime = ref(0);

function contactEnter() {
  rightBoxes.top = Date.now();
  rightBoxes.bottom = 1;
}
function contactLeave() {
  if (rightBoxes.bottom === 0) {
    return;
  }
  resetSkis();
  rightBoxes.bottom = Date.now();
  rightBoxes.delta = rightBoxes.bottom - rightBoxes.top;
  console.log(`contact delta: ${rightBoxes.delta}`);
  const head = document.querySelector("#head");
  head.setAttribute("move", "keyboard", false);
  head.setAttribute("move", "delta", rightBoxes.delta);

  rightBoxes.top = 0;
  rightBoxes.bottom = 0;
}

function resetSkis() {
  const leftSkis = document.querySelector("#left-ski");
  const rightSkis = document.querySelector("#right-ski");

  leftSkis.removeAttribute("animation");
  leftSkis.removeAttribute("animation__2");
  rightSkis.removeAttribute("animation");
  rightSkis.removeAttribute("animation__2");
  leftSkis.setAttribute("rotation", "-90 0 0");
  rightSkis.setAttribute("rotation", "-90 0 0");
  leftSkis.setAttribute("position", "-0.2 0.1 1");
  rightSkis.setAttribute("position", "0.2 0.1 1");
}

function move() {
  if (animationStart) return;

  const head = document.querySelector("#head");
  resetSkis();
  animatePoles();
  const delta = randomNb(300, 399);

  setTimeout(() => {
    head.setAttribute("move", "keyboard", true);
    head.setAttribute("move", "delta", delta);
  }, 500);
}

function brake() {
  const head = document.querySelector("#head");
  head.setAttribute("move", "keyboard", true);
  head.setAttribute("move", "delta", 0);
  animateSkis();
}

window.addEventListener("touchstart", (e) => {
  if (document.querySelector("#onboarding")) return;
  move();
});

window.addEventListener("keydown", (e) => {
  if (document.querySelector("#onboarding")) return;
  if (e.key === "w" || e.key === "ArrowUp") {
    move();
  } else if (e.key === "s" || e.key === "ArrowDown") {
    brake();
  }
});

window.addEventListener("triggerdown", brake);

function animatePoles() {
  animationStart = true;
  const poles = document.querySelector("#poles");
  poles.setAttribute("animation", "property: rotation; to: -20 0 0; dur: 1000");
  poles.setAttribute(
    "animation__2",
    "property: position; to: 0 -0.1 0.2; dur: 800"
  );

  poles.setAttribute(
    "animation__3",
    "property: position; to: 0 0 0; dur: 800; delay: 800"
  );
  poles.setAttribute(
    "animation__4",
    "property: rotation; to: 0 0 0; dur: 800; delay: 800"
  );
  setTimeout(() => {
    poles.removeAttribute("animation__2");
    poles.removeAttribute("animation__3");
    poles.removeAttribute("animation__4");
    poles.removeAttribute("animation");
  }, 1600);
  animationStart = false;
}

function animateSkis() {
  const leftSkis = document.querySelector("#left-ski");
  const rightSkis = document.querySelector("#right-ski");

  leftSkis.setAttribute(
    "animation",
    "property: rotation; to: -90 0 -10; dur: 500"
  );
  leftSkis.setAttribute(
    "animation__2",
    "property: position; to: -0.5 0.1 1; dur: 500"
  );
  rightSkis.setAttribute(
    "animation",
    "property: rotation; to: -90 0 10; dur: 500"
  );
  rightSkis.setAttribute(
    "animation__2",
    "property: position; to: 0.5 0.1 1; dur: 500"
  );
}

function isItlastDoor(index) {
  if (index === nbDoors - 1) {
    return 2;
  }
  return 1;
}
</script>

<template>
  <a-scene
    fog="type: exponential; color: white; near: 20; far: 500; density: 0.05;"
    physx="
      autoLoad: true;
      delay: 1000;
      useDefaultScene: false;
      wasmUrl: lib/physx.release.wasm;
    "
  >
    <a-assets @loaded="allAssetsLoaded = true">
      <a-asset-item
        id="tree-asset"
        src="assets/low-poly_fair-tree.glb"
      ></a-asset-item>
      <a-asset-item id="ski-asset" src="assets/ski.glb"></a-asset-item>
      <img id="snow" src="/assets/snow.jpg" />
      <a-asset-item
        id="scoreboard-asset"
        src="assets/scoreboard.glb"
      ></a-asset-item>
      <a-asset-item
        id="rock-asset"
        src="assets/low_poly_rock.glb"
      ></a-asset-item>
      <a-asset-item id="pole-asset" src="assets/pole.glb"></a-asset-item>
      <a-asset-item
        id="penguin-asset"
        src="assets/dancing_penguin.glb"
      ></a-asset-item>
    </a-assets>

    <template v-if="allAssetsLoaded">
      <a-plane
        position="0 0 -4"
        rotation="-90 0 0"
        width="100"
        height="500"
        color="#FFFFFF"
        src="#snow"
      >
      </a-plane>
      <a-entity
        gltf-model="#tree-asset"
        position="8 0 -10"
        scale="0.01 0.01 0.01"
      ></a-entity>

      <a-entity
        bind-rotation="target: #head"
        bind-position="target: #head; y: false"
      >
        <a-entity id="poles">
          <a-entity
            gltf-model="#pole-asset"
            position="0.3 1.5 -0.4"
            scale="0.01 0.01 0.01"
            hide-in-vr
          ></a-entity>
          <a-entity
            gltf-model="#pole-asset"
            position="-0.3 1.5 -0.4"
            scale="0.01 0.01 0.01"
            hide-in-vr
          ></a-entity>
        </a-entity>

        <a-entity
          gltf-model="#ski-asset"
          id="left-ski"
          position="-0.2 0.1 1"
          scale="0.015 0.015 0.015"
          rotation="-90 0 0"
        ></a-entity>

        <a-entity
          gltf-model="#ski-asset"
          id="right-ski"
          position="0.2 0.1 1"
          scale="0.015 0.015 0.015"
          rotation="-90 0 0"
        ></a-entity>
      </a-entity>
      <a-entity id="penguin-army" visible="false">
        <a-entity
          gltf-model="#penguin-asset"
          scale="0.006 0.006 0.006"
          position="0 0 -3"
          animation-mixer
        ></a-entity>
        <a-entity
          gltf-model="#penguin-asset"
          scale="0.006 0.006 0.006"
          position="-2 0 -3"
          animation-mixer
        ></a-entity>
        <a-entity
          gltf-model="#penguin-asset"
          scale="0.006 0.006 0.006"
          position="2 0 -3"
          animation-mixer
        ></a-entity>
        <a-entity
          gltf-model="#penguin-asset"
          scale="0.006 0.006 0.006"
          position="1 0 0"
          animation-mixer
        ></a-entity>
        <a-entity
          gltf-model="#penguin-asset"
          scale="0.006 0.006 0.006"
          position="-1 0 0"
          animation-mixer
        ></a-entity>
        <a-entity
          gltf-model="#penguin-asset"
          scale="0.006 0.006 0.006"
          position="3 0 0"
          animation-mixer
        ></a-entity>
      </a-entity>

      <a-sky color="#023e8a"></a-sky>
      <Scoreboard position="0 0 0" rotation="0 90 0"></Scoreboard>
      <Scoreboard
        id="scoreboard-end"
        rotation="0 180 0"
        visible="false"
      ></Scoreboard>
      <Teleporter id="teleporter" visible="false" position="0 20 0">
      </Teleporter>
    </template>

    <a-entity bind-rotation="target: #head" bind-position="target: #head;">
      <a-box
        id="hitbox-right-top"
        position="-0 -0.3 -0.2"
        color="blue"
        depth="0.7"
        height="0.01"
        width="0.8"
        visible="false"
        physx-body="type: kinematic; emitCollisionEvents: true"
        @contactbegin="contactEnter()"
      >
      </a-box>
      <a-box
        id="hitbox-right-bottom"
        position="-0. -0.55 -0.2"
        color="blue"
        depth="0.7"
        height="0.01"
        width="0.8"
        visible="false"
        physx-body="type: kinematic; emitCollisionEvents: true"
        @contactbegin="contactLeave()"
      >
      </a-box>
    </a-entity>

    <template v-for="(_, index) in nbDoors">
      <SkiDoor
        :nb="index + 1"
        :position="getDoorPosition(index)"
        @door-passed="doorPassed(index)"
        :class="`door-${index}`"
        :nb-doors="nbDoors"
        :sound="isItlastDoor(index)"
      />
    </template>

    <TheCameraRig />
  </a-scene>
</template>

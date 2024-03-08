<script setup>
import { ref } from "vue";

import TheCameraRig from "./TheCameraRig.vue";

import Scoreboard from "./Scoreboard.vue";
import "../aframe/bind-rotation.js";
import "../aframe/bind-position.js";
import "../aframe/chronometer.js";
import Race from "./Race.vue";
import { randomNb } from "../utils/randomNb.js";
import TreesAndRocks from "./TreesAndRocks.vue";

defineProps({
  scale: Number,
  overlaySelector: String,
});

const nbDoors = 7;
const nbTree = nbDoors * 7;
const nbRock = nbDoors * 5;

const allAssetsLoaded = ref(false);
let doorsPosition;
const raceLoaded = ref(false);
let animationStart = false;
const head = document.querySelector("#head");
//query

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

function getDoorPosition(doors) {
  doorsPosition = doors;
  raceLoaded.value = true;
}

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
      <a-asset-item
        id="sound1"
        response-type="arraybuffer"
        src="assets/sound1.mp3"
        preload="auto"
      ></a-asset-item>
      <a-asset-item
        id="sound2"
        response-type="arraybuffer"
        src="assets/sound2.mp3"
        preload="auto"
      ></a-asset-item>
      <a-asset-item
        id="sound3"
        response-type="arraybuffer"
        src="assets/sound3.mp3"
        preload="auto"
      ></a-asset-item>
    </a-assets>

    <template v-if="allAssetsLoaded">
      <a-plane
        position="0 0 -4"
        rotation="-90 0 0"
        width="200"
        height="800"
        color="#FFFFFF"
        material="src: #snow; repeat: 1 1"
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

      <TreesAndRocks
        v-if="raceLoaded"
        :doorsPosition="doorsPosition"
        :nbTree="nbTree"
        :nbRock="nbRock"
      />
      />
      <a-sky color="#023e8a"></a-sky>
      <a-entity
        gltf-model="#tree-asset"
        scale="0.006 0.006 0.006"
        position="5 0 4"
      ></a-entity>
      <a-entity gltf-model="#rock-asset" position="-5 0 0"></a-entity>
      <Scoreboard position="0 0 0" rotation="0 90 0"></Scoreboard>
      <Race :nbDoors="nbDoors" @doors-position="getDoorPosition"></Race>
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
    <TheCameraRig />
  </a-scene>
</template>

<script setup>
import { randomNb } from "../utils/randomNb.js";

const props = defineProps({
  nbTree: {
    type: Number,
    default: 60,
  },
  nbRock: {
    type: Number,
    default: 40,
  },
  doorsPosition: {
    type: Array,
  },
});

function getPosition() {
  let x, z;
  const zLastDoor = getZfromLastDoor();
  do {
    x = randomNb(-25, 25);
    z = randomNb(zLastDoor - 25, 25);
  } while (!checkIfNothing(x, z));

  return `${x} 0 ${z}`;
}

function getRotation() {
  return `0 ${randomNb(0, 180)} 0`;
}

function getScale(object) {
  let scale = "0 0 0";
  if (object === "tree") {
    scale = randomNb(3, 13) / 1000;
  } else {
    scale = randomNb(50, 150) / 100;
  }

  return `${scale} ${scale} ${scale}`;
}

function getFinishZonePosition() {
  const pos = props.doorsPosition[props.doorsPosition.length - 1].split(" ");
  return { x: pos[0] - 1.5, z: pos[2] - 9 };
}

function checkIfNothing(x, z) {
  let checked = true;
  props.doorsPosition.forEach((pos) => {
    pos = pos.split(" ");
    const diffX = x - pos[0];
    const diffZ = z - pos[2];

    if (diffX < 3 && diffX > -3 && diffZ < 3 && diffZ > -3) {
      console.log("too close to door");
      checked = false;
    }
  });
  //check finish
  const finishZone = getFinishZonePosition();
  const diffX = x - finishZone.x;
  const diffZ = z - finishZone.z;
  if (diffX < 10 && diffX > -10 && diffZ < 10 && diffZ > -10) {
    console.log("too close to finish");
    checked = false;
  }

  //check départ
  if (x < 6 && x > -6 && z < 6 && z > -6) {
    console.log("too close to start");
    checked = false;
  }

  return checked;
}

function getZfromLastDoor() {
  return props.doorsPosition[props.doorsPosition.length - 1].split(" ")[2];
}
</script>

<template>
  <template v-for="(_, index) in nbTree">
    <a-entity
      gltf-model="#tree-asset"
      :scale="getScale('tree')"
      :position="getPosition()"
    ></a-entity>
  </template>

  <template v-for="(_, index) in nbRock">
    <a-entity
      gltf-model="#rock-asset"
      :scale="getScale('rock')"
      :position="getPosition()"
      :rotation="getRotation()"
    ></a-entity>
  </template>
</template>

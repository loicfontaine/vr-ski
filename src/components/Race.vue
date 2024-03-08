<script setup>
import SkiDoor from "./SkiDoor.vue";
import { ref } from "vue";
import { randomNb } from "../utils/randomNb.js";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storeRead.js";
import Finish from "./Finish.vue";

const props = defineProps({
  nbDoors: {
    type: Number,
    default: 8,
  },
});
const emit = defineEmits("doors-position");

const doorsPosition = [];
const allDoorsCreated = ref(false);
let doorPassedCount = 0;

function getDoorPosition(index) {
  if (index === 0) {
    doorsPosition.push("0 0 -5");
    return `0 0 -5`;
  }
  const x = randomNb(-13, 13);
  const z = index * -15 + randomNb(-2, 2);
  doorsPosition.push(`${x} 0 ${z}`);
  if (index === props.nbDoors - 1) {
    emit("doors-position", doorsPosition);
  }
  return `${x} 0 ${z}`;
}

function doorPassed(index) {
  doorPassedCount++;
  console.log("door passed", doorPassedCount);
  if (index === 0) {
    firstDoorPassed();
  } else if (index === props.nbDoors - 1) {
    lastDoorPassed();
  }
}

function firstDoorPassed() {
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
  console.log("nbDoors", props.nbDoors);
  if (doorPassedCount < props.nbDoors) return;
  console.log("last door passed");
  document.querySelectorAll(".door-timer").forEach((el) => {
    el.setAttribute("chronometer", "stop", "true");
  });
  handleScore();
  const penguinArmy = document.querySelector("#penguin-army");
  penguinArmy.setAttribute("sound", "src: #sound3; autoplay: true");
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

function isItlastDoor(index) {
  if (index === props.nbDoors - 1) {
    allDoorsCreated.value = true;
    return 2;
  }
  return 1;
}
</script>
<template>
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
  <template v-if="allDoorsCreated">
    <Finish :position="doorsPosition[doorsPosition.length - 1]"></Finish>
  </template>
</template>

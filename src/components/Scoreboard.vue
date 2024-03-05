<script setup>
import { get } from "lodash-es";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storeRead.js";

setTimeout(function () {
  const scores = getFromLocalStorage("scoreboard");

  if (scores) {
  } else {
    saveToLocalStorage("scoreboard", ["90:00:00", "90:00:00", "90:00:00"]);
  }
  const scoreboardText = document.querySelectorAll(".scoreboard-text");

  scoreboardText.forEach((el) => {
    el.setAttribute(
      "value",
      `1:\t${scores[0]}\n2:\t${scores[1]}\n3:\t${scores[2]}\n`
    );
  });
}, 2000);
</script>

<template>
  <a-entity gltf-model="#scoreboard-asset" scale="0.5 0.5 0.5">
    <a-text
      id="scoreboard-text"
      class="scoreboard-text"
      value="1:\t\n2:\t\n3:\t"
      position="0 4 9.3"
      line-height="60"
      color="white"
      align="center"
      width="12"
      font="roboto"
      rotation="0 180 0"
    ></a-text>
  </a-entity>
</template>

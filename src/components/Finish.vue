<script setup>
import Teleporter from "./Teleporter.vue";
import Scoreboard from "./Scoreboard.vue";
</script>
<template>
  <a-entity>
    <a-entity id="penguin-army" position="-6 0 -4" rotation="0 60 0">
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
    <a-entity
      gltf-model="#tree-asset"
      scale="0.01 0.01 0.01"
      position="-9 0 -10"
    ></a-entity>
    <a-entity gltf-model="#rock-asset" position="5 0 -5"></a-entity>
    <a-entity
      gltf-model="#tree-asset"
      scale="0.006 0.006 0.006"
      position="7 0 -10"
    ></a-entity>
    <a-entity
      gltf-model="#tree-asset"
      scale="0.012 0.012 0.012"
      position="0 0 -16"
    ></a-entity>
    <Scoreboard
      id="scoreboard-end"
      rotation="0 180 0"
      position="-4 0 -8"
    ></Scoreboard>
    <Teleporter id="teleporter" position="4 0 -12.3"> </Teleporter>
  </a-entity>
</template>

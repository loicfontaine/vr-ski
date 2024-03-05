<script setup>
import "/src/aframe/emit-when-near.js";
import "/src/aframe/clickable.js";

defineProps({
  nb: Number,
  nbDoors: Number,
  sound: { Number, default: 1 },
});
</script>
<template>
  <a-entity
    geometry="primitive: torus; radius: 3; radiusTubular: 0.2; arc: 180;"
    material="color: #00a896;"
  >
    <a-entity
      entity-id="door"
      geometry="primitive: circle; radius: 2.7"
      material="color: black; opacity: 0.3; transparent: true;"
      sphysx-body="type: kinematic; emitCollisionEvents: true"
      emit-when-near="distance: 3"
      @near="$emit('doorPassed', 1)"
      :sound="`src: url(assets/sound${sound}.mp3); on: near`"
    >
      <a-text
        :text="`value: Porte ${nb}/${nbDoors}; align: center; font: roboto; width: 13; color: white`"
        position="0 1.3 0.01"
      ></a-text>
    </a-entity>

    <a-entity
      geometry="primitive: plane; width: 1; height: 0.4"
      position="0 3 0.42"
      material="color: black"
    >
      <a-entity
        geometry="primitive: plane; width: 0.9; height: 0.3"
        position="0 0 0.01"
        material="color: grey"
      >
        <a-text
          value="00:00:00"
          position="0 0 0.01"
          align="center"
          width="3"
          font="roboto"
          class="door-timer"
        >
        </a-text>
      </a-entity>
    </a-entity>
  </a-entity>
</template>

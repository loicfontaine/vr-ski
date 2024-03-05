<script setup>
import "/src/aframe/emit-when-near.js";

function teleport() {
  const rig = document.querySelector("#camera-rig");
  const camera = document.querySelector("[camera]");
  // Put the rig at the specified position
  rig.object3D.position.x = 0;
  rig.object3D.position.y = 0;
  rig.object3D.position.z = 5;
  // Put the camera at the centre of the rig
  camera.object3D.position.x = 0;
  camera.object3D.position.z = 0;
  const penguinArmy = document.querySelector("#penguin-army");
  penguinArmy.removeAttribute("sound");
}
</script>
<template>
  <a-entity
    geometry="primitive: torus; radius: 3; radiusTubular: 0.2; arc: 180;"
    material="color: #7209b7;"
  >
    <a-entity
      entity-id="teleporter-door"
      geometry="primitive: circle; radius: 2.7"
      material="color: black; opacity: 0.3; transparent: true;"
      sphysx-body="type: kinematic; emitCollisionEvents: true"
      emit-when-near="distance: 2"
      @near="teleport()"
      sound="src: url(assets/sound1.mp3); on: near"
    >
      <a-text
        :text="`value: Recommencer la partie; align: center; font: roboto; width: 8; color: white`"
        position="0 1.3 0.01"
      ></a-text>
    </a-entity>
  </a-entity>
</template>

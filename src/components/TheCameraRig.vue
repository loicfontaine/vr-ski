<script setup>
import "../aframe/disable-in-vr.js";
import "../aframe/simple-navmesh-constraint.js";
import "../aframe/blink-controls.js";
import "../aframe/move.js";
import "../aframe/hide-in-vr.js";
</script>

<template>
  <a-entity
    id="camera-rig"
    dmovement-controls="camera: #head;"
    disable-ind-vr="component: movement-controls;"
    move
    wasd-controls="enabled: false;"
  >
    <a-entity
      id="head"
      look-controls="pointerLockEnabled: true"
      simple-navmesh-constraint="navmesh: [data-role='nav-mesh']; height: 1.65;"
      disable-in-vr="component: simple-navmesh-constraint;"
      camera
      position="0 1.65 0"
    >
      <!--
      <a-sphere
        id="head-collider"
        position="0 0 -0.6"
        radius="0.02"
        color="blue"
        visible="false"
        physx-body="type: kinematic; emitCollisionEvents: true"
      >
      </a-sphere>
-->
      <a-entity
        geometry="primitive: circle; radius: 0.0003;"
        material="shader: flat; color: white;"
        cursor
        raycaster="far: 4; objects: [clickable]; showLine: false;"
        position="0 0 -0.1"
        disable-in-vr="component: raycaster; disableInAR: false;"
        hide-in-vr="hideInAR: false"
      ></a-entity>
    </a-entity>

    <a-entity
      id="hand-left"
      oculus-touch-controls="hand: left; model: false"
      vive-controls="hand: left; model: false"
      blink-controls="
          cameraRig: #camera-rig;
          teleportOrigin: #head;
          collisionEntities: [data-role='nav-mesh'];
          snapTurn: false;
        "
    >
      <a-sphere
        id="hand-left-collider"
        radius="0.02"
        color="blue"
        visible="false"
        physx-body="type: kinematic; emitCollisionEvents: true"
      >
      </a-sphere>
      <a-entity
        gltf-model="url(assets/pole.glb)"
        position="0 0 0"
        rotation="-90 0 0"
        scale="0.01 0.01 0.01"
      >
      </a-entity>
    </a-entity>

    <a-entity
      id="hand-right"
      oculus-touch-controls="hand: right; model: false"
      vive-controls="hand: right; model: false"
    >
      <a-sphere
        id="hand-right-collider"
        radius="0.02"
        visible="false"
        physx-body="type: kinematic; emitCollisionEvents: true"
        color="green"
      >
      </a-sphere>
      <a-entity
        gltf-model="url(assets/pole.glb)"
        position="0 0 0"
        rotation="-90 0 0"
        scale="0.01 0.01 0.01"
        visible="true"
      >
      </a-entity>
    </a-entity>
  </a-entity>
</template>

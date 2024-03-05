AFRAME.registerComponent("bind-position", {
  schema: {
    target: { type: "selector" },
    x: { type: "boolean", default: true },
    y: { type: "boolean", default: true },
    z: { type: "boolean", default: true },
  },
  init: function () {
    this.targetWorldPos = new THREE.Vector3();
    this.myWorldPos = new THREE.Vector3();
  },
  tick: function () {
    this.data.target.object3D.getWorldPosition(this.targetWorldPos);
    if (this.data.x) this.el.object3D.position.x = this.targetWorldPos.x;
    if (this.data.y) this.el.object3D.position.y = this.targetWorldPos.y;
    if (this.data.z) this.el.object3D.position.z = this.targetWorldPos.z;
    // // world to local
    // this.myWorldPos = this.el.object3D.parent.worldToLocal(this.myWorldPos);
    // this.el.object3D.position.copy(this.targetWorldPos);
  },
});

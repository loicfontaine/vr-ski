AFRAME.registerComponent("bind-rotation", {
  schema: {
    target: { type: "selector" },
  },
  tick: function () {
    this.el.object3D.rotation.y = this.data.target.object3D.rotation.y;
  },
});

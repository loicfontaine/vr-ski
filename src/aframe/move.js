AFRAME.registerComponent("move", {
  schema: {
    delta: { type: "number", default: 0 },
    friction: { type: "number", default: 0.99 },
    rig: { type: "selector", default: "#camera-rig" },
    keyboard: { type: "boolean", default: false },
  },

  init: function () {
    this.isRunning = false;
    this.deltaMove = 0;
  },

  update() {
    if (this.data.delta < 400 && this.data.delta > 0 && !this.isRunning) {
      console.log("moving");
      this.deltaMove = 8 - this.data.delta / 100;
      if (this.deltaMove > 7) this.deltaMove = 7;
      this.isRunning = true;
      setTimeout(() => {
        this.isRunning = false;
      }, 300);
    } else if (this.data.delta === 0) {
      this.deltaMove *= 0.5;
    }
  },

  tick: function (t, dt) {
    if (this.data.delta > 400) return;
    const position = this.data.rig.object3D.position;
    const rotation = this.el.object3D.rotation;
    const x = position.x;
    const z = position.z;
    const y = position.y;
    const yRotation = rotation.y;
    let keyboardMove = 1;

    if (this.data.keyboard) {
      keyboardMove = 1.5;
    }

    const dx =
      Math.sin(yRotation) * (dt / 1000) * this.deltaMove * keyboardMove;
    const dz =
      Math.cos(yRotation) * (dt / 1000) * this.deltaMove * keyboardMove;
    const dy = 0;

    position.x = x - dx;
    position.z = z - dz;
    position.y = y - dy;
    if (this.deltaMove < 0.1) {
      this.deltaMove = 0;
    }
    this.deltaMove = this.deltaMove * this.data.friction;
  },
});

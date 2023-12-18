/**
 * Defines the parent class for player or AI agents.
 * @abstract
 */
class Agent {
  constructor({ collider, physics, renderer, transform, controller } = {}) {
    this.collider = collider;
    this.physics = physics;
    this.renderer = renderer;
    this.transform = transform;
    this.controller = controller;
  }

  update() {
    if (this.collider && typeof this.collider.update === "function") {
      this.collider.update(this.transform);
    }

    if (this.physics && typeof this.physics.apply === "function") {
      this.physics.apply();
    }

    if (this.renderer && typeof this.renderer.render === "function") {
      this.renderer.render(this.transform);
    }

    if (this.controller && typeof this.controller.update === "function") {
      this.controller.update(this);
    }
  }
}

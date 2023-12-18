class GameObject {
  constructor(
    collider = null,
    physics = null,
    renderer = null,
    transform = new Transform(createVector(0, 0), createVector(1, 1))
  ) {
    this.collider = collider;
    this.physics = physics;
    this.renderer = renderer;
    this.transform = transform;
  }

  addCollider(collider) {
    this.collider = collider;
  }

  removeCollider() {
    this.collider = null;
  }

  addPhysics(physics) {
    this.physics = physics;
  }

  removePhysics() {
    this.physics = null;
  }

  addRenderer(renderer) {
    this.renderer = renderer;
  }

  removeRenderer() {
    this.renderer = null;
  }

  update() {
    if (this.collider) {
      this.collider.update(this.transform);
    }

    if (this.physics) {
      this.physics.apply(this.transform);
    }

    if (this.renderer) {
      this.renderer.render(this.transform);
    }
  }
}

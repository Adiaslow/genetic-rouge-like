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
  
  removePhysics()

  addRenderer(renderer) {
    this.renderer = renderer;
  }
}

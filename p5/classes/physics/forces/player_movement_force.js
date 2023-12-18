class PlayerMovementForce extends Force {
  constructor(force = createVector(0, 0)) {
    super(force);
  }

  apply(physics, playerController) {
    const inputDirection = playerController.getDirection();

    const scaledForce = p5.Vector.mult(this.force, inputDirection.mag());

    super.apply(physics, scaledForce);
  }
}

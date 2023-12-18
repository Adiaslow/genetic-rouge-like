/**
 * Defines the Physics class which will be attached to any Game Object that should obey physical rules.
 * @extends {Agent}
 */
class Physics {
  constructor(mass, velocity, acceleration, isActive = true) {
    this.isActive = isActive;
    this.mass = mass;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.forces = {
      appliedForce: new AppliedForce(),
      dragForce: new DragForce(),
      frictionalForce: new FrictionalForce(),
      gravitationalForce: new GravitationalForce(),
      normalForce: new NormalForce(),
      playerMovementForce: new PlayerMovementForce(),
      springForce: new SpringForce(),
    };
  }

  applyForces() {
    for (const forceName in this.forces) {
      const force = this.forces[forceName];
      this.acceleration.add(force.force);
    }
  }

  apply(transform) {
    if (this.isActive) {
      this.applyForces();
      this.velocity.add(this.acceleration);
      transform.position.add(this.velocity);
    }
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }
}
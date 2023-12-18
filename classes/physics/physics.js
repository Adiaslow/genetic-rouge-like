/**
 * Defines the Physics class which will be attached to any Game Object that should obey physical rules.
  @extends {Agent}
 */

class Physics {
  constructor(mass, velocity, acceleration, isActive = true) {
    this.isActive = isActive;
    this.mass = mass;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.forces = {
      applied_force: new AppliedForce(),
      drag_force: new DragForce(),
      frictional_force: new FrictionalForce(),
      gravitational_force: new GravitationalForce(),
      normal_force: new NormalForce(),
      spring_force: new SpringForce(),
    };
  }

  apply() {
    this.velocity += this.accelration;
    transform.position += this.velocity;
  }

  activate() {
    this.isActive = true;
  }
  
  deactivate() {
    this.isActive = false;
  }
}

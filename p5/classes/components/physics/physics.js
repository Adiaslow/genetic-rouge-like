/**
 * @class Physics
 * @classdesc The Physics class. Physics is a component of a Game Object.
 * @abstract
 */
class Physics {
  /**
   * @constructor
   * @param {number} mass - The mass of the entity.
   * @param {Vector2} velocity - The velocity of the entity.
   * @param {Vector2} acceleration - The acceleration of the entity.
   * @param {Vector2} netForce - The net force of the entity.
   * @param {boolean} isActive - Whether or not the entity is active.
   */
  constructor(mass, velocity, acceleration, netForce, isActive) {
    // Set default values or use provided values
    this.isActive = isActive || true;
    this.mass = mass || 1;
    this.velocity = velocity || createVector(0, 0, 0);
    this.acceleration = acceleration || createVector(0, 0, 0);
    this.netForce = netForce || createVector(0, 0, 0);

    // Forces object with named properties for forces
    this.forces = {
      appliedForce: [true, createVector(0, 0, 0)],
      dragForce: [true, createVector(0, 0, 0)],
      frictionalForce: [true, createVector(0, 0, 0)],
      gravitationalForce: [true, createVector(0, 0, 0)],
      normalForce: [true, createVector(0, 0, 0)],
      playerMovementForce: [true, createVector(0, 0, 0)],
      springForce: [true, createVector(0, 0, 0)],
    };
  }

  /**
   * @method apply
   * @methoddesc Applies the physics to the Game Object.
   * @param {Transform} transform - The transform of the entity.
   */
  apply(transform, playerMovementInput) {
    if (this.isActive) {
      // reset forces
      this.netForce.set(0, 0, 0);

      for (let force in this.forces) {
        this.forces[force][1].set(0, 0, 0);
      }

      // Reset acceleration to zero
      this.acceleration.set(0, 0, 0);

      // Apply forces
      if (this.forces.appliedForce[0]) {
      }

      if (this.forces.playerMovementForce[0]) {
        this.forces.playerMovementForce[1].add(
          new PlayerMovementForce(playerMovementInput).force,
        );
        // this.netForce.add(this.forces.playerMovementForce[1]);
      }

      if (this.forces.dragForce[0]) {
      }

      if (this.forces.gravitationalForce[0]) {
        this.forces.gravitationalForce[1].add(
          new GravitationalForce(this.netForce).force,
        );
        // this.netForce.add(this.forces.gravitationalForce[1]);
      }

      if (this.forces.normalForce[0]) {
        this.forces.normalForce[1].add(
          new NormalForce(this.forces.gravitationalForce[1], transform).force,
        );
        // this.netForce.add(this.forces.normalForce[1]);
      }

      if (this.forces.frictionalForce[0]) {
        this.forces.frictionalForce[1].add(
          new FrictionalForce(
            this.netForce,
            this.forces.normalForce[1],
            this.velocity,
            0.5,
          ).force,
        );
        // this.netForce.add(this.forces.frictionalForce[1]);
      }

      // Calculate net force and
      for (let force in this.forces) {
        this.netForce.add(this.forces[force][1]);
      }

      this.netForce.div(this.mass);

      // Calculate acceleration and update velocity and position
      this.acceleration.add(p5.Vector.div(this.netForce, this.mass));
      this.velocity.add(this.acceleration);
      transform.position.add(this.velocity);

      // Log forces , position, velocity, acceleration, and net force
      console.log(
        "Applied Force: " +
          this.forces.appliedForce[1] +
          ",\nDrag Force: " +
          this.forces.dragForce[1] +
          ",\nFrictional Force: " +
          this.forces.frictionalForce[1] +
          ",\nGravitational Force: " +
          this.forces.gravitationalForce[1] +
          ",\nNormal Force: " +
          this.forces.normalForce[1] +
          ",\nPlayer Movement Force: " +
          this.forces.playerMovementForce[1] +
          ",\nSpring Force: " +
          this.forces.springForce[1],
        "\n\nPosition: " +
          transform.position +
          ",\nVelocity: " +
          this.velocity +
          ",\nAcceleration: " +
          this.acceleration +
          ",\nNet Force: " +
          this.netForce,
      );
    }
  }

  /**
   * @method activate
   * @methoddesc Activates the physics of the Game Object.
   */
  activate() {
    this.isActive = true;
  }

  /**
   * @method deactivate
   * @methoddesc Deactivates the physics of the Game Object.
   */
  deactivate() {
    this.isActive = false;
  }
}

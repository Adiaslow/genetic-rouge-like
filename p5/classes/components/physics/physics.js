/**
 * @class Physics
 * @classdesc The Physics class. Physics is a component of a Game Object.
 * @abstract
 */
class Physics {
  /**
   * @constructor
   * @param {number} mass - The mass of the entity.
   * @param {Vector3} velocity - The velocity of the entity.
   * @param {Vector3} acceleration - The acceleration of the entity.
   * @param {Vector3} netForce - The net force of the entity.
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

  calculateNetForce() {
    this.netForce.set(0, 0, 0);
    for (let force in this.forces) {
      if (this.forces[force][0]) {
        this.netForce.add(this.forces[force][1]);
      }
    }
  }

  logPhysics(transform) {
    console.log(
      "Forces:",
      Object.keys(this.forces)
        .map((f) => `${f}: ${this.forces[f][1].toString()}`)
        .join(",\n"),
      "\n\nPosition:",
      transform.position.toString(),
      "\nVelocity:",
      this.velocity.toString(),
      "\nAcceleration:",
      this.acceleration.toString(),
      "\nNet Force:",
      this.netForce.toString(),
    );
  }

  /**
   * @method apply
   * @methoddesc Applies the physics to the Game Object.
   * @param {Transform} transform - The transform of the Game Object.
   * @param {Vector3} playerMovementInput - The player movement input.
   */
  apply(transform, collider, playerMovementInput) {
    if (!this.isActive) return;
    // Adjust time step (experiment with values)
    let adjustedDeltaTime = deltaTime * 0.05;

    // Reset all forces to zero for the next frame. New forces will be calculated in the next frame
    for (let force in this.forces) {
      this.forces[force][1].set(0, 0, 0);
    }

    // Check if the object is moving
    const isMoving = this.velocity.mag() > 0.1;

    // Apply forces
    if (this.forces.appliedForce[0]) {
      // this.forces.appliedForce[1].add(new AppliedForce().force);
    }

    if (this.forces.dragForce[0]) {
      this.forces.dragForce[1].add(
        new DragForce(this.velocity, isMoving, transform).force,
      );
    }

    if (this.forces.playerMovementForce[0]) {
      this.forces.playerMovementForce[1].add(
        new PlayerMovementForce(playerMovementInput).force,
      );
    }

    if (this.forces.gravitationalForce[0]) {
      this.forces.gravitationalForce[1].add(new GravitationalForce().force);
    }

    if (this.forces.normalForce[0]) {
      this.forces.normalForce[1].add(
        new NormalForce(this.forces.gravitationalForce[1], transform).force,
      );
    }

    if (this.forces.frictionalForce[0] && transform.position.z <= 0) {
      this.forces.frictionalForce[1].add(
        new FrictionalForce(
          this.velocity,
          this.forces.normalForce[1],
          0.7,
          0.25,
          isMoving,
        ).force,
      );
    }

    // Calculate net force at the beginning of the time step
    this.calculateNetForce();

    // Calculate new acceleration based on the net force
    let newAcceleration = p5.Vector.div(this.netForce, this.mass);

    // Calculate the average acceleration (midpoint between current and new acceleration)
    let averageAcceleration = p5.Vector.add(
      this.acceleration,
      newAcceleration,
    ).mult(0.5);

    if (this.acceleration.mag() < 1) {
      this.acceleration.mult(0);
    }

    // Update velocity based on the average acceleration
    this.velocity.add(averageAcceleration.mult(adjustedDeltaTime));

    if (this.velocity.magSq() < 1) {
      this.velocity.mult(0);
    }

    // Update position based on the new velocity
    transform.position.add(p5.Vector.mult(this.velocity, adjustedDeltaTime));

    if (transform.position.y - collider.radius + 16 < 0) {
      transform.position.y = collider.radius - 16;
    }
    if (transform.position.y + collider.radius + 32 + 64 > height) {
      transform.position.y = height - collider.radius - 32 - 64;
    }
    if (transform.position.x - collider.radius + 24 < 0) {
      transform.position.x = collider.radius - 24;
    }

    if (transform.position.x + collider.radius + 38 > width) {
      transform.position.x = width - collider.radius - 38;
    }

    // Check if the z component is below 0
    if (transform.position.z < 0) {
      // Set the z component to 0
      transform.position.z = 0;
      this.velocity.z = 0;
    }

    // Assign the new acceleration to this.acceleration for the next frame
    this.acceleration = newAcceleration;

    // Log forces, position, velocity, and acceleration
    // this.logPhysics(transform);
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

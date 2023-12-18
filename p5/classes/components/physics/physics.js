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
   * @param {Vector2} force - The net force acting on the entity.
   * @param {boolean} isActive - Whether or not the entity is active.
   */
  constructor(mass, velocity, acceleration, force, isActive) {
    this.isActive = isActive === undefined ? true : isActive;
    this.mass = mass || 1;
    this.velocity = velocity || createVector(0, 0);
    this.acceleration = acceleration || createVector(0, 0);
    this.netForce = force || createVector(0, 0);
    this.forces = {
      appliedForce: [true, createVector(0, 0)],
      dragForce: [true, createVector(0, 0)],
      frictionalForce: [true, createVector(0, 0)],
      gravitationalForce: [true, createVector(0, 0)],
      normalForce: [true, createVector(0, 0)],
      playerMovementForce: [true, createVector(0, 0)],
      springForce: [true, createVector(0, 0)],
    };
  }

  /**
   * @method apply
   * @methoddesc Applies the physics to the Game Object.
   */
  apply(transform) {
    if (this.isActive) {
      for (const forceName in this.forces) {
        if (this.forces[forceName][0]) {
          this.netForce.add(this.forces[forceName][1]);
        }
      }
      this.acceleration = this.netForce.copy().div(this.mass);
      this.velocity.add(this.acceleration);
      transform.position.add(this.velocity);
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

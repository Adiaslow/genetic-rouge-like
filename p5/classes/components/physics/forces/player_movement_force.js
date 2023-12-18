/**
 * @class PlayerMovementForce
 * @classdesc A force that is applied to the player upon user input.
 * @extends{Force}
 */
class PlayerMovementForce extends Force {
  constructor(force) {
    super();
    this.force = force;
  }
}

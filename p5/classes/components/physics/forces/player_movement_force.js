/**
 * @class PlayerMovementForce
 * @classdesc A force that is applied to the player upon user input.
 * @extends{Force}
 */
class PlayerMovementForce extends Force {
  /**
   * @constructor
   * @param {p5.Vector} force - The force to apply to the object.
   */
  constructor(force) {
    super();
    this.force = force.mult(createVector(8, 6, 100));
  }
}

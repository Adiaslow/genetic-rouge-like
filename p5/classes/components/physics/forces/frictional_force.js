/**
 * @class FrictionalForce
 * @classdesc A force that applies a frictional force to an object.
 * @extends{Force}
 */
class FrictionalForce extends Force {
  /**
   * @constructor
   * @param {p5.Vector} netForce - The net force to apply to the object.
   * @param {p5.Vector} normalForce - The normal force to apply to the object.
   * @param {number} coefficientOfFriction - The coefficient of friction to apply to the object.
   */
  constructor(netForce, normalForce, velocity, coefficientOfFriction) {
    super();
    this.reflectedNetXYForce = p5.Vector.mult(
      createVector(velocity.x, velocity.y, 0),
      createVector(-1, -1, 1),
    ).normalize();
    this.force = p5.Vector.mult(
      this.reflectedNetXYForce,
      p5.Vector.mult(normalForce, coefficientOfFriction).mag(),
    );
  }
}

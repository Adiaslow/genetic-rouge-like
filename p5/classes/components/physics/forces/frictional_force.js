/**
 * @class FrictionalForce
 * @classdesc A force that applies a frictional force to an object.
 * @extends{Force}
 */
class FrictionalForce extends Force {
  /**
   * @constructor
   * @param {p5.Vector} normalForce - The normal force to apply to the object.
   * @param {number} frictionCoefficient - The coefficient of friction to apply to the object.
   */
  constructor(normalForce, frictionCoefficient) {
    this.force = p5.Vector.mult(normalForce, frictionCoefficient);
  }
}

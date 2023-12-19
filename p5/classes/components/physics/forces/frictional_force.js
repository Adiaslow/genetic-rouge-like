/**
 * @class FrictionalForce
 * @classdesc A force that applies a frictional force to an object.
 * @extends {Force}
 */
class FrictionalForce extends Force {
  /**
   * @constructor
   * @param {p5.Vector} velocity - The velocity of the object.
   * @param {p5.Vector} normalForce - The normal force to apply to the object.
   * @param {number} coefficientOfFriction - The coefficient of friction to apply to the object.
   */
  constructor(velocity, normalForce, coefficientOfFriction) {
    super();
    // Check if the velocity magnitude is greater than 0 to avoid jittering
    if (velocity.mag() > 0) {
      // Calculate the frictional force based on the normal force and a friction factor
      const frictionFactor = coefficientOfFriction * normalForce.mag();
      this.force = velocity.copy().mult(-1).normalize().mult(frictionFactor);
    } else {
      // If the velocity is zero, set the frictional force to zero
      this.force = createVector(0, 0, 0);
    }
  }
}

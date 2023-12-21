/**
 * @class FrictionalForce
 * @classdesc A force that applies a frictional force to an object.
 * @extends {Force}
 */
class FrictionalForce extends Force {
  /**
   * @constructor
   * @param {p5.Vector} velocity - The velocity of the object.
   * @param {p5.Vector} normalForce - The normal force acting on the object.
   * @param {number} coefficientOfStaticFriction - The coefficient of static friction.
   * @param {number} coefficientOfKineticFriction - The coefficient of kinetic friction.
   */
  constructor(
    velocity,
    normalForce,
    coefficientOfStaticFriction,
    coefficientOfKinetcFriction,
    isMoving,
  ) {
    super();

    // Choose the appropriate coefficient of friction
    const coefficientOfFriction = isMoving
      ? coefficientOfKinetcFriction
      : coefficientOfStaticFriction;

    // If the object is moving or is capable of moving (kinetic friction scenario)
    if (isMoving) {
      const frictionMagnitude = coefficientOfFriction * normalForce.mag();
      this.force = p5.Vector.mult(
        velocity.copy().normalize().mult(1, 1, 0),
        -frictionMagnitude,
      );
    } else {
      this.force = createVector(0, 0, 0);
    }
  }
}

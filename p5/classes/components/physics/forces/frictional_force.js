/**
 * @class FrictionalForce
 * @classdesc A force that applies a frictional force to an object.
 * @extends {Force}
 */
class FrictionalForce extends Force {
  constructor(
    velocity,
    normalForce,
    coefficientOfStaticFriction,
    coefficientOfKinetcFriction,
  ) {
    super();

    const isMoving = velocity.mag() > 0.1;

    // Choose the appropriate coefficient of friction
    const coefficientOfFriction = isMoving
      ? coefficientOfKinetcFriction
      : coefficientOfStaticFriction;

    // If the object is moving or is capable of moving (kinetic friction scenario)
    if (isMoving) {
      const frictionMagnitude = coefficientOfFriction * normalForce.mag();
      this.force = p5.Vector.mult(velocity.normalize(), -frictionMagnitude);
    } else {
      this.force = createVector(0, 0, 0);
    }
  }
}

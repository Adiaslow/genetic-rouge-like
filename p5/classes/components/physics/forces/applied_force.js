/**
 * @class AppliedForce
 * @classdesc A force that is applied to an object.
 * @extends{Force}
 */
class AppliedForce extends Force {
  /**
   * @constructor
   * @param {p5.Vector} force - The force to apply to the object.
   */
  constructor(force) {
    super();
    this.force = force;
  }
}

/**
 * @class Force
 * @classdesc Defines the parent class for all forces.
 * @abstract
 */
class Force {
  /**
   * @constructor
   * @abstract
   */
  constructor() {
    if (this.constructor === Force) {
      throw new Error("Cannot instantiate abstract class Force.");
    }
  }
}

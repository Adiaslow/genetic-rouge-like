/**
 * @class NormalForce
 * @classdesc NormalForce is a type of Force that is perpendicular to the surface of the object.
 *
 * @extends{Force}
 */

class NormalForce extends Force {
  /**
   * @constructor
   * @param {p5.Vector} force - The current forces acting on the object.
   */
  constructor(force) {
    this.force = p5.Vector.reflect(force, createVector(0, 0, 1));
  }
}

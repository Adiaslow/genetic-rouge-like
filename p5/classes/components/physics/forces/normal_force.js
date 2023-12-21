/**
 * @class NormalForce
 * @classdesc NormalForce is a type of Force that is perpendicular to the surface of the object.
 *
 * @extends{Force}
 */

class NormalForce extends Force {
  /**
   * @constructor
   * @param {p5.Vector} netForce - The net force of the entity.
   * @param {Transform} transform - The transform of the entity.
   */
  constructor(netForce, transform) {
    super();
    if (transform.position.z <= 0) {
      this.force = p5.Vector.mult(netForce, createVector(0, 0, -1));
    } else {
      this.force = createVector(0, 0, 0);
    }
  }
}

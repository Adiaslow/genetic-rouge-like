/**
 * @class EllipseCollider
 * @classdesc An ellipse collider.
 * @extends Collider
 */
class CircleCollider extends Collider {
  /**
   * @constructor
   * @param {Vector} center - The center of the ellipse.
   * @param {number} radius - The radius of the ellipse.
   */
  constructor(center, radius) {
    super(center);
    this.radius = radius;
  }

  update(transform) {
    super.update(transform);
  }
}

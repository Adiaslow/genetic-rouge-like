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
  constructor(center, diameter) {
    super(center);
    this.radius = diameter * 0.5;
  }

  update(transform) {
    this.center = transform.position;
  }
}

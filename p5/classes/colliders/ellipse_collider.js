/**
 * Defines an ellipse collider of a Game Object for the purposes of detection or physical collision.
 */
class EllipseCollider extends Collider {
  constructor(center, radius) {
    super(center);
    this.radius = radius;
  }
}

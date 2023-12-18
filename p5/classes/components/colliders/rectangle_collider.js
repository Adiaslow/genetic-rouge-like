/**
 * Defines a rectangle collider of a Game Object for the purposes of detection or physical collision.
 */
class RectangleCollider extends Collider {
  constructor(center, boundsHeight, boundsWidth) {
    super(center);
    this.boundsHeight = boundsHeight;
    this.boundsWidth = boundsWidth;
  }
}

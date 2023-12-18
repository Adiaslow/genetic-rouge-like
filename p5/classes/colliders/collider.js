/**
 * Defines the collider of a Game Object for the purposes of detection or physical collision.
 * @abstract
 */
class Collider {
  constructor(center) {
    this.center = center;
  }

  update(transform) {
    this.center = transform.position;
  }
}
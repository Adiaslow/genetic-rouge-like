/**
 * Defines the collider of a Game Object for the purposes of detection or physical collision.
 * @abstract
 */
class Collider {
  /**
   * @constructor
   * @param {Vector} center - The center of the collider.
   */
  constructor(center) {
    this.center = center;
    if (this.constructor === Collider) {
      throw new Error("Cannot instantiate abstract class Collider.");
    }
  }

  /**
   * @method update
   * @methoddesc Updates the collider.
   * @param {Transform} transform - The transform of the Game Object.
   * @abstract
   */
  update(transform) {
    this.center = transform.position;
    if (this.constructor === Collider) {
      throw new Error("Cannot call abstract method update.");
    }
  }
}

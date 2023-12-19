/**
 * @class GameObject
 * @classdesc The generic Game Object class.
 * @abstract
 */
class GameObject {
  /**
   * @constructor
   * @param {Collider} collider - The collider of the entity.
   * @param {Physics} physics - The physics of the entity.
   * @param {Renderer} renderer - The renderer of the entity.
   * @param {Transform} transform - The transform of the entity.
   */
  constructor(collider, physics, renderer, transform) {
    this.collider = collider || null;
    this.physics = physics || null;
    this.renderer = renderer || null;
    this.transform =
      transform || new Transform(createVector(0, 0, 0), createVector(1, 1, 1));

    if (this.constructor === GameObject) {
      throw new Error("Cannot instantiate abstract class GameObject.");
    }
  }

  /**
   * @method addCollider
   * @methoddesc Adds a collider to the Game Object.
   */
  addCollider(collider) {
    this.collider = collider;
  }

  /**
   * @method removeCollider
   * @methoddesc Removes the collider from the Game Object.
   */
  removeCollider() {
    this.collider = null;
  }

  /**
   * @method addPhysics
   * @methoddesc Adds physics to the Game Object.
   * @param {Physics} physics - The physics to add to the Game Object.
   */
  addPhysics(physics) {
    this.physics = physics;
  }

  /**
   * @method removePhysics
   * @methoddesc Removes physics from the Game Object.
   */
  removePhysics() {
    this.physics = null;
  }

  /**
   * @method addRenderer
   * @methoddesc Adds a renderer to the Game Object.
   */
  addRenderer(renderer) {
    this.renderer = renderer;
  }

  /**
   * @method removeRenderer
   * @methoddesc Removes the renderer from the Game Object.
   */
  removeRenderer() {
    this.renderer = null;
  }

  /**
   * @method update
   * @methoddesc Updates the collider, physics, and renderer of the Game Object.
   */
  update() {
    if (this.collider !== null) {
      this.collider.update(this.transform);
    }

    if (this.physics !== null) {
      this.physics.apply(this.transform);
    }

    if (this.renderer !== null) {
      this.renderer.render(this.transform);
    }
  }
}

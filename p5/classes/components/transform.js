/**
 * @class Transform
 * @classdesc A Transform is a component that holds the position and size of an entity.
 */
class Transform {
  /**
   * @constructor
   * @param {Vector2} position - The position of the entity.
   * @param {Vector2} size - The size of the entity.
   */
  constructor(position, size) {
    this.position = position;
    this.size = size;
  }
}

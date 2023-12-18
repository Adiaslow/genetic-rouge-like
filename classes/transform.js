/**
 * Defines the position, rotation, and size of a Game Object.
 * Note: rotation should be done with quaternions when we move to an engine. For now, they are not enabled.
 */

class Transform {
  constructor(position, size, rotation = null) {
    this.position = position;
    this.rotation = rotation;
    this.size = size;
  }
}

/**
 * Defines the position, rotation, and size of a Game Object.
 * Note: Rotation should be handled with quaternions when transitioning to an engine; however, it is currently not enabled.
 */
class Transform {
  constructor(position, size) {
    this.position = position;
    this.size = size;
  }
}

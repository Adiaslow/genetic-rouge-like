/**
 * Defines the player class.
  @extends {Agent}
 */

class Player extends Agent {
  constructor() {
    super(
      (collider = null),
      (physics = null),
      (renderer = null),
      (transform = new Transform(createVector(0, 0), createVector(1, 1)))
    );
  }
}

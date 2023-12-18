/**
 * Defines the parent class for player or AI agents.
 */

/** @abstract */
class Agent extends GameObject {
  constructor(controller = null) {
    super(
      (collider = null),
      (physics = null),
      (renderer = null),
      (transform = new Transform(createVector(0, 0), createVector(1, 1)))
    )
    this.controller = controller;
  }
}

/**
 * Defines the parent class for enemy agents.
 * @extends {Agent}
 */
class Enemy extends Agent {
  constructor(collider = null,
               physics = null,
               renderer = null,
               transform = new Transform(createVector(0, 0), createVector(1, 1))) {
    super(collider, physics, renderer, transform);
  }
}

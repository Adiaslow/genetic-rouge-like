/**
 * @class Agent
 * @classdesc The generic Agent class. Agents are GameObjects that have a controller.
 * @abstract
 */
class Agent extends GameObject {
  constructor(collider, physics, renderer, transform, controller) {
    super(collider, physics, renderer, transform);
    this.physics =
      physics || new Physics(1, createVector(0, 0), createVector(0, 0));
    this.controller = controller || null;

    if (this.constructor === Agent) {
      throw new Error("Cannot instantiate abstract class Agent.");
    }
  }
}

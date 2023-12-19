/**
 * @class Agent
 * @classdesc The generic Agent class. Agents are GameObjects that have a controller.
 * @abstract
 */
class Agent extends GameObject {
  constructor(collider, physics, renderer, transform, controller) {
    super(collider, physics, renderer, transform);
    this.controller = controller || null;

    if (this.constructor === Agent) {
      throw new Error("Cannot instantiate abstract class Agent.");
    }
  }
}

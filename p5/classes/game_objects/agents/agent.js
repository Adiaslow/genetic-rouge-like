/**
 * @class Agent
 * @classdesc The generic Agent class. Agents are GameObjects that have a controller.
 * @abstract
 */
class Agent extends GameObject {
  constructor(collider, physics, shadow, transform, controller) {
    super(collider, physics, null, shadow, transform);
    this.controller = controller;

    if (this.constructor === Agent) {
      throw new Error("Cannot instantiate abstract class Agent.");
    }
  }
}

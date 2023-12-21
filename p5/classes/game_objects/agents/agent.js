/**
 * @class Agent
 * @classdesc The generic Agent class. Agents are GameObjects that have a controller.
 * @abstract
 */
class Agent extends GameObject {
  constructor(collider, physics, renderer, shadow, transform, controller) {
    super(collider, physics, renderer, shadow, transform);
    this.shadow = shadow || null;
    this.controller = controller || null;

    if (this.constructor === Agent) {
      throw new Error("Cannot instantiate abstract class Agent.");
    }
  }
}

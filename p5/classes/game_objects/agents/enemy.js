/**
 * @class Enemy
 * @classdesc The generic Enemy class. Enemies are Agents that have an enemy AI controller.
 * @abstract
 */
class Enemy extends Agent {
  constructor(collider, physics, renderer, transform, enemyController) {
    super(collider, physics, renderer, transform, controller);
    this.controller = enemyController || null;
  }
}

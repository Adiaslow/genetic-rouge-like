/**
 * @class Enemy
 * @classdesc The generic Enemy class. Enemies are Agents that have an enemy AI controller.
 * @abstract
 */
class EnemyAgent extends Agent {
  /**
   * @constructor
   * @param {Collider} collider The collider of the player.
   * @param {Physics} physics The physics of the player.
   * @param {Renderer} renderer The renderer of the player.
   * @param {Shadow} shadow The shadow of the player.
   * @param {Transform} transform The transform of the player.
   * @param {PlayerController} controller The player controller.
   */
  constructor(collider, physics, renderer, shadow, transform, enemyController) {
    super(collider, physics, renderer, shadow, transform, enemyController);
    console.log("Player Spawned!");
  }

  /**
   * @method update
   * @methoddesc Updates the enemy and its components.
   */
  update(player) {
    let enemyMovementInput;

    if (this.collider !== null) {
      this.collider.update(this.transform);
    }

    if (this.controller !== null) {
      enemyMovementInput = this.controller.handleInput(
        this.transform,
        this.physics,
        player,
      );
    }

    if (this.physics !== null) {
      // Now `playerMovementInput` is visible here
      this.physics.apply(this.transform, this.collider, enemyMovementInput);
    }

    if (this.shadow !== null) {
      this.shadow.render(this.transform);
    }
    /*
    if (this.renderer !== null) {
      this.renderer.render(this.transform);
    }
    */
  }
}

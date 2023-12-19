/**
 * @class Player
 * @classdesc The Player class. The player is an Agent that has a PlayerController.
 * @extends {Agent}
 */
class Player extends Agent {
  /**
   * @constructor
   * @param {Collider} collider The collider of the player.
   * @param {Physics} physics The physics of the player.
   * @param {Renderer} renderer The renderer of the player.
   * @param {Transform} transform The transform of the player.
   * @param {PlayerController} controller The player controller.
   */
  constructor(collider, physics, renderer, transform, controller) {
    super(collider, physics, renderer, transform, controller);
    console.log("Player Spawned!");
  }

  /**
   * @method update
   * @methoddesc Updates the player and its components.
   */
  update() {
    if (this.collider !== null) {
      this.collider.update(this.transform);
    }

    let playerMovementInput = createVector(0, 0, 0);

    if (this.controller !== null) {
      playerMovementInput.add(this.controller.handleInput());
      // console.log("Player Movement Input: " + playerMovementInput);
    }

    if (this.physics !== null) {
      this.physics.apply(this.transform, playerMovementInput);
    }

    if (this.renderer !== null) {
      this.renderer.render(this.transform);
    }
  }
}

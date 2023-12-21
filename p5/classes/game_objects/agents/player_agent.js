/**
 * @class Player
 * @classdesc The Player class. The player is an Agent that has a PlayerController.
 * @extends {Agent}
 */
class PlayerAgent extends Agent {
  /**
   * @constructor
   * @param {Collider} collider The collider of the player.
   * @param {Physics} physics The physics of the player.
   * @param {Renderer} renderer The renderer of the player.
   * @param {Shadow} shadow The shadow of the player.
   * @param {Transform} transform The transform of the player.
   * @param {PlayerController} controller The player controller.
   */
  constructor(collider, physics, renderer, shadow, transform, controller) {
    super(collider, physics, renderer, shadow, transform, controller);
    console.log("Player Spawned!");
  }

  /**
   * @method update
   * @methoddesc Updates the player and its components.
   */
  update() {
    let playerMovementInput; // Declare it outside of the 'if' block

    if (this.collider !== null) {
      this.collider.update(this.transform);
    }

    if (this.controller !== null) {
      playerMovementInput = this.controller.handleInput(
        this.transform,
        this.physics,
      );
    }

    if (this.physics !== null) {
      // Now `playerMovementInput` is visible here
      this.physics.apply(this.transform, this.collider, playerMovementInput);
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

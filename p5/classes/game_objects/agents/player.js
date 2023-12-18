/**
 * @class Player
 * @classdesc The Player class. The player is an Agent that has a PlayerController.
 * @extends{Agent}
 */
class Player extends Agent {
  /**
   * @constructor
   * @param{Collider} collider The collider of the player.
   * @param{Physics} physics The physics of the player.
   * @param{Renderer} renderer The renderer of the player.
   */
  constructor(collider, physics, renderer, transform) {
    super(collider, physics, renderer, transform, controller);
    this.controller = new PlayerController();

    console.log("Player Spawned!");
  }

  /**
   * @method update
   * @methoddesc Updates the player.
   */
  update() {
    if (this.collider) {
      this.collider.update(this.transform); // Update the collider.
    }

    this.controller.handleInput(); // Handle the player's input.

    if (this.physics) {
      this.physics.apply(this.transform); // Apply the physics.
    }

    if (this.renderer) {
      this.renderer.render(this.transform); // Render the player.
    }
  }
}

/**
 * Defines the player class.
  @extends {Agent}
 */

class Player extends Agent {
  constructor(
    { collider = null, 
     physics = new Physics(1, createVector(0,0),createVector(0,0), 1), 
     renderer = new CircleRenderer(50), 
     transform = new Transform(createVector(0, 0), createVector(1, 1)), controller = new PlayerController() } = {}
  ) {
    super({ collider, physics, renderer, transform, controller });
    console.log("Player Spawned!");
  }
}


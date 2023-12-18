/**
 * @class PlayerController
 * @classdesc The PlayerController class is a Controller subclass that handles input for the Player class.
 * @extends Controller
 */
class PlayerController extends Controller {
  /**
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * @method handleInput
   * @methoddesc Handles input for the Player class.
   */
  handleInput(physics) {
    if (keyIsDown(87)) {
      // W key
      physics.forces.playerMovementForce[1] += new PlayerMovementForce(
        createVector(0, -1),
      );
      console.log("Up");
    }
    if (keyIsDown(83)) {
      // S key
      physics.forces.playerMovementForce[1] += new PlayerMovementForce(
        createVector(0, 1),
      );
      console.log("Down");
    }
    if (keyIsDown(65)) {
      // A key
      physics.forces.playerMovementForce[1] += new PlayerMovementForce(
        createVector(1, 0),
      );
      console.log("Left");
    }
    if (keyIsDown(68)) {
      // D key
      physics.forces.playerMovementForce[1] += new PlayerMovementForce(
        createVector(-1, 0),
      );
      console.log("Right");
    }
  }
}

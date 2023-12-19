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
  handleInput() {
    let playerMovementInput = createVector(0, 0, 0);
    // W key
    if (keyIsDown(87)) {
      playerMovementInput.add(createVector(0, -1, 0));
    }
    // S key
    if (keyIsDown(83)) {
      playerMovementInput.add(createVector(0, 1, 0));
    }

    // A key
    if (keyIsDown(65)) {
      playerMovementInput.add(createVector(-1, 0, 0));
    }

    // D key
    if (keyIsDown(68)) {
      playerMovementInput.add(createVector(1, 0, 0));
    }

    return playerMovementInput.normalize();
  }
}

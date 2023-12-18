class PlayerController extends Controller {
  constructor() {
    super();
  }

  handleInput(physics) {
    if (keyIsDown(87)) { // W key
      physics.forces.appliedForce.add(createVector(0, -1)); // Up
      console.log("Up");
    }
    if (keyIsDown(83)) { // S key
      physics.forces.appliedForce.add(createVector(0, 1)); // Down
      console.log("Down");
    }
    if (keyIsDown(65)) { // A key
      physics.forces.appliedForce.add(createVector(-1, 0)); // Left
      console.log("Left");
    }
    if (keyIsDown(68)) { // D key
      physics.forces.appliedForce.add(createVector(1, 0)); // Right
      console.log("Right");
    }
  }
}
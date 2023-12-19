/**
 * @method setup
 * @methoddesc The p5.js setup function. Called once at the beginning of the program.
 */
function setup() {
  background(128);
  // 1024 pixels / 32 pixels per tile = 32 tiles wide, 768 pixels / 32 pixels per tile = 24 tiles tall.
  createCanvas(1024, 768);

  playerStartingPosition = createVector(width / 2, height / 2, 0); // The player's starting position.

  // Create a new player object.
  player = new Player(
    new CircleCollider(playerStartingPosition, 50),
    new Physics(
      (mass = 3),
      (velocity = createVector(0, 0, 0)),
      (acceleration = createVector(0, 0, 0)),
      (netForce = createVector(0, 0, 0)),
    ),
    new CircleRenderer(50),
    new Transform(playerStartingPosition, createVector(1, 1, 1)),
    new PlayerController(),
  );
}

let frameCounter = 0;
let fps = 0;

/**
 * @method draw
 * @methoddesc The p5.js draw function. Called once per frame.
 */
function draw() {
  background(128);

  if (frameCounter % 10 === 0) {
    fps = frameRate();
  }
  frameCounter++;
  fill(255);
  textSize(24);
  text("FPS: " + Math.floor(fps), 20, 30);

  player.update();
}

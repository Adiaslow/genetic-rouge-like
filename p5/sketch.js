/**
 * @method setup
 * @methoddesc The p5.js setup function. Called once at the beginning of the program.
 */
function setup() {
  background(128);
  // 1024 pixels / 32 pixels per tile = 32 tiles wide, 768 pixels / 32 pixels per tile = 24 tiles tall.
  createCanvas(1024, 768);

  playerStartingPosition = createVector(0, 0); // The player's starting position.

  // Create a new player object.
  player = new Player(
    new CricleCollider(playerStartingPosition, 50),
    new Physics(1, createVector(0, 0), createVector(0, 0)),
    new CircleRenderer(playerStartingPosition, 50),
    new Transform(playerStartingPosition, createVector(1, 1)),
    new PlayerController(),
  );
}

/**
 * @method draw
 * @methoddesc The p5.js draw function. Called once per frame.
 */
function draw() {
  background(128);
  player.update();
}

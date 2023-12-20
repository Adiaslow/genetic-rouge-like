let playerImage;
let backgroundImage;
let frameCounter = 0;
let fps = 0;
let canvasWidth = 1024;
let canvasHeight = 768;

/**
 * @method preload
 * @methoddesc The p5.js preload function. Called once before setup.
 */
function preload() {
  playerSprite = loadImage("sprites/crabby1.png");
  bg = loadImage("backgrounds/sand.jpg");
}

/**
 * @method setup
 * @methoddesc The p5.js setup function. Called once at the beginning of the program.
 */
function setup() {
  background(bg);
  // 1024 pixels / 32 pixels per tile = 32 tiles wide, 768 pixels / 32 pixels per tile = 24 tiles tall.
  createCanvas(canvasWidth, canvasHeight);

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
    new SpriteRenderer(playerSprite, 50, 50, true),
    new Transform(playerStartingPosition, createVector(1, 1, 1)),
    new PlayerController(),
  );
}

/**
 * @method draw
 * @methoddesc The p5.js draw function. Called once per frame.
 */
function draw() {
  background(bg);

  if (frameCounter % 10 === 0) {
    fps = frameRate();
  }
  frameCounter++;
  fill(255);
  textSize(24);
  text("FPS: " + Math.floor(fps), 20, 30);

  player.update();
}

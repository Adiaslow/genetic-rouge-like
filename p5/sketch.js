let tileMap = [];
let decorativeTileMap = [];
let decorativeTilesProbability = 0.028;

let frameCounter = 0;
let fps = 0;
let canvasWidth = 1024;
let canvasHeight = 768;

let playerAnimations;
let fxAnimations;
let jellyFishAnimations;

/**
 * @method preload
 * @methoddesc The p5.js preload function. Called once before setup.
 */
function preload() {
  // Load the tilemap sprite sheet
  tilemapSpriteSheet = loadImage("sprites/tiles/underwater-sprite-sheet.png");

  playerAnimations = {
    idle: loadImage("sprites/crab/crab-idle.gif"),
    walkLeft: loadImage("sprites/crab/crab-walk-left.gif"),
    walkRight: loadImage("sprites/crab/crab-walk-right.gif"),
    hurt: loadImage("sprites/crab/crab-hurt.gif"),
    death: loadImage("sprites/crab/crab-death.gif"),
    attackLeft: loadImage("sprites/crab/crab-attack-left.gif"),
    attackRight: loadImage("sprites/crab/crab-attack-right.gif"),
  };

  fxAnimations = {
    jumpUp: loadImage("sprites/smoke/jump-smoke.gif"),
    pivotLeft: loadImage("sprites/smoke/pivot-left-smoke.gif"),
    pivotRight: loadImage("sprites/smoke/pivot-right-smoke.gif"),
  };

  jellyFishAnimations = {
    idle: loadImage("sprites/jelly-fish/jelly-fish-idle.gif"),
    walk: loadImage("sprites/jelly-fish/jelly-fish-walk.gif"),
    hurt: loadImage("sprites/jelly-fish/jelly-fish-hurt.gif"),
    death: loadImage("sprites/jelly-fish/jelly-fish-death.gif"),
    attack: loadImage("sprites/jelly-fish/jelly-fish-attack.gif"),
  };
}

/**
 * @method setup
 * @methoddesc The p5.js setup function. Called once at the beginning of the program.
 */
function setup() {
  // Set up the canvas
  // frameRate(10);
  createCanvas(canvasWidth, canvasHeight, P2D);
  // getAudioContext().suspend();

  // 1024 pixels / 32 pixels per tile = 32 tiles wide, 768 pixels / 32 pixels per tile = 24 tiles tall.
  createCanvas(canvasWidth, canvasHeight);

  noSmooth(); // Disable smoothing for the entire canvas
  pixelDensity(1); // Set pixel density to 1 to avoid retina display issues

  // Initialize player properties
  let playerStartingPosition = createVector(width / 2, height / 2, 0);
  const playerStartingVelocity = createVector(0, 0, 0);
  const playerStartingAcceleration = createVector(0, 0, 0);
  const playerStartingForce = createVector(0, 0, 0);

  let playerSize = createVector(64, 64, 64);

  // Create a new player object
  player = new PlayerAgent(
    new CircleCollider(playerStartingPosition, 32),
    new Physics(
      3,
      playerStartingVelocity,
      playerStartingAcceleration,
      playerStartingForce,
    ),
    new ShadowRenderer(playerSize.x),
    new Transform(playerStartingPosition, playerSize),
    new PlayerController(playerAnimations, fxAnimations),
  );

  EnemyController.setImages(jellyFishAnimations);

  enemyManager = new EnemyManager(player, 4, 5, 250);

  initializeTileMap();
}

/**
 * @method initializeTileMap
 * @methoddesc Initializes the tilemap with ground and wall tiles.
 */
function initializeTileMap() {
  let tileSize = 32;
  let tileRenderSize = 64;

  for (let i = 0; i < 16 * 12; i++) {
    let x = i % 16;
    let y = Math.floor(i / 16);

    // Create tiles based on position
    if (y !== 0 && y !== 11) {
      tileMap[i] = new Tile(
        new Transform(
          createVector(x * tileRenderSize, y * tileRenderSize, 0),
          createVector(tileRenderSize, tileRenderSize, tileRenderSize),
        ),
        "ground",
        tilemapSpriteSheet.get(9 * tileSize, 0 * tileSize, 32, 32),
      );
      if (random(0.0, 1.0) < decorativeTilesProbability) {
        decorativeTileMap[i] = new Tile(
          new Transform(
            createVector(x * tileRenderSize, y * tileRenderSize, 0),
            createVector(tileRenderSize, tileRenderSize, tileRenderSize),
          ),
          "ground",
          tilemapSpriteSheet.get(32 * tileSize, 0 * tileSize, 32, 32),
        );
      }
    } else if (y === 0) {
      tileMap[i] = new Tile(
        new Transform(
          createVector(x * tileRenderSize, y * tileRenderSize, 0),
          createVector(tileRenderSize, tileRenderSize, tileRenderSize),
        ),
        "wall",
        tilemapSpriteSheet.get(28 * tileSize, 0 * tileSize, 32, 32),
      );
    } else if (y === 11) {
      tileMap[i] = new Tile(
        new Transform(
          createVector(x * tileRenderSize, y * tileRenderSize, 0),
          createVector(tileRenderSize, tileRenderSize, tileRenderSize),
        ),
        "wall",
        tilemapSpriteSheet.get(16 * tileSize, 0 * tileSize, 32, 32),
      );
    }
  }
}

/**
 * @method draw
 * @methoddesc The p5.js draw function. Called once per frame.
 */
function draw() {
  clear();
  // Draw tilemap
  for (let i = 0; i < 16 * 12; i++) {
    tileMap[i].renderer.render(tileMap[i].transform);
    if (decorativeTileMap[i]) {
      decorativeTileMap[i].renderer.render(decorativeTileMap[i].transform);
    }
  }

  // Display FPS
  if (frameCounter % 10 === 0) {
    fps = frameRate();
  }
  frameCounter++;
  fill(0);
  textSize(18);
  text("FPS: " + Math.floor(fps), 12, 56);

  // Update the player
  player.update();
  enemyManager.update();
}

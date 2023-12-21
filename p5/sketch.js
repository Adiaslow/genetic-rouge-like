let tileMap = [];
let decorativeTileMap = [];
let decorativeTilesProbability = 0.028;

let frameCounter = 0;
let fps = 0;

/**
 * @method preload
 * @methoddesc The p5.js preload function. Called once before setup.
 */
function preload() {
  // Load the tilemap sprite sheet
  tilemapSpriteSheet = loadImage("sprites/tiles/underwater-sprite-sheet.png");
}

/**
 * @method setup
 * @methoddesc The p5.js setup function. Called once at the beginning of the program.
 */
function setup() {
  // Set up the canvas
  createCanvas(1024, 768, P2D);
  // getAudioContext().suspend();

  noSmooth(); // Disable smoothing for the entire canvas
  pixelDensity(1); // Set pixel density to 1 to avoid retina display issues

  // Initialize player properties
  let playerStartingPosition = createVector(width / 2, height / 2, 0);
  let playerSize = createVector(64, 64, 64);

  // Create a new player object
  player = new PlayerAgent(
    new CircleCollider(playerStartingPosition, 32),
    new Physics(
      3,
      createVector(0, 0, 0),
      createVector(0, 0, 0),
      createVector(0, 0, 0),
    ),
    null,
    new ShadowRenderer(playerSize.x),
    new Transform(playerStartingPosition, playerSize),
    new PlayerController(),
  );

  enemyManager = new EnemyManager(player);
  enemyManager.initialize();

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
  fill(255);
  textSize(24);
  text("FPS: " + Math.floor(fps), 20, 30);

  // Update the player
  player.update();
  enemyManager.update();
}

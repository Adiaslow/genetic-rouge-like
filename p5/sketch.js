function setup() {
  createCanvas(856, 400);
  player = new Player({
    collider: new Collider(createVector(0, 0)),
    physics: new Physics(1, createVector(0, 0), createVector(0, 0)), // Remove the extra 'new' here
    renderer: new CircleRenderer(1, 50),
    transform: new Transform(createVector(0, 0), createVector(1, 1)),
    controller: new PlayerController(),
  });
}

function draw() {
  background(220);
  player.controller.handleInput();
  player.update();
}

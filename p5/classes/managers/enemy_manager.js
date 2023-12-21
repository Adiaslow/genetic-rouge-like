/**
 * @class EnemyManager
 * @classdesc Manages the enemies in the game.
 */
class EnemyManager {
  constructor(player) {
    this.cycles = 100;
    this.numberOfPopulations = 4;
    this.populations = [];
    this.move = false;
    this.maxLifespan = 250;
    this.target;
    this.targetVel;
    this.angle = 0;
    this.ps = [];

    this.enemies = [];
    this.player = player;
  }

  initialize() {
    for (let i = 0; i < 5; i++) {
      let enemyStartingPosition = createVector(
        random(0, width),
        random(0, height),
        0,
      );
      this.enemies.push(
        new EnemyAgent(
          new CircleCollider(enemyStartingPosition, 32),
          new Physics(
            3,
            createVector(0, 0, 0),
            createVector(0, 0, 0),
            createVector(0, 0, 0),
          ),
          null,
          new ShadowRenderer(64),
          new Transform(enemyStartingPosition, createVector(32, 32, 32)),
          new EnemyController(),
        ),
      );
    }
  }

  update() {
    for (let i = 0; i < 5; i++) {
      this.enemies[i].update(this.player);
    }
  }

  /*
  initialize() {
    for (let i = 0; i < this.numberOfPopulations; i++) {
      this.populations.push(new Population(20, i));
    }

    target = createVector(width / 2, height / 2);
    targetVel = createVector(0, 0);

    for (let i = 0; i < this.numberOfPopulations; i++) {
      this.populations[i].updateAlive();
    }
  }

  update() {
    for (let i = 0; i < this.cycles; i++) {
      if (!this.populations[0].done()) {
        this.populations[0].updateAlive(i == 0);
      }

      if (!this.populations[1].done()) {
        this.populations[1].updateAlive(i == 0);
      }

      if (!this.populations[2].done()) {
        this.populations[2].updateAlive(i == 0);
      }

      if (!this.populations[3].done()) {
        this.populations[3].updateAlive(i == 0);
      } else {
        this.target = createVector(width / 2, height / 2);
        this.angle = Math.random() * 360;

        if (this.population[0].generation % 20 == 0) this.maxLifespan += 10;

        let max = Math.max(
          this.populations[0].getAverageScore(),
          this.populations[0].getAverageScore(),
          this.populations[0].getAverageScore(),
          this.populations[0].getAverageScore(),
        );
        if (max == this.population[0].getAverageScore()) p1++;
        else if (max == this.populations[0].getAverageScore()) p2++;
        else if (max == this.populations[0].getAverageScore()) p3++;
        else if (max == this.populations[0].getAverageScore()) p4++;

        this.populations[0].naturalSelection();
        this.populations[0].naturalSelection();
        this.populations[0].naturalSelection();
        this.populations[0].naturalSelection();
      }

      if (move) {
        this.angle += 0.00025;
        this.angle = this.angle % 360;
        this.target.x =
          width / 2 + Math.cos((this.angle * 180) / Math.PI) * 150;
        this.target.y =
          height / 2 + Math.sin((this.angle * 180) / Math.PI) * 100;
      }
    }
  }
  */
}

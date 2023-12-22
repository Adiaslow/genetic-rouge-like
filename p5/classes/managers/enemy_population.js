/**
 * @class EnemyPopulation
 * @classdesc Manages the population of enemy agents in the game.
 */
class EnemyPopulation {
  constructor(size, player) {
    this.player = player;
    this.population = [];
    this.bestPlayer = null;
    this.bestFitness = 0;

    this.generation = 0;
    this.matingPool = [];

    for (let i = 0; i < size; i++) {
      const enemyStartingPosition = createVector(
        random(0, width),
        random(0, height),
        0,
      );

      // Create an initial transform and store it
      const initialTransform = new Transform(
        enemyStartingPosition,
        createVector(1, 1, 1),
      );

      const initialCollider = new CircleCollider(enemyStartingPosition, 32);
      const initialPhysics = new Physics(
        10,
        createVector(0, 0, 0),
        createVector(0, 0, 0),
        createVector(0, 0, 0),
      );
      const initialShadow = new ShadowRenderer(64);
      const brain = new Genome(6, 3, i);
      brain.generateNetwork();
      brain.mutate();
      const initialController = new EnemyController(brain);
      const newEnemy = new EnemyAgent(
        initialCollider,
        initialPhysics,
        initialShadow,
        initialTransform,
        initialController,
      );

      if (i === 0) {
        this.bestPlayer = newEnemy.clone();
      }

      // console.log(newEnemy.controller);
      this.population.push(newEnemy);
    }
    this.calculateFitness();
  }

  updateAlive() {
    for (const enemy of this.population) {
      if (!enemy.controller.dead) {
        enemy.update(this.player);
      }
    }
  }

  done() {
    return this.population.every((enemy) => enemy.controller.dead);
  }

  naturalSelection() {
    this.calculateFitness();

    let averageSum = this.getAverageScore();
    let children = [];

    this.fillMatingPool();

    for (let i = 0; i < this.population.length; i++) {
      let parent1 = this.selectPlayer();
      let parent2 = this.selectPlayer();
      let childController = parent1.controller.crossover(parent2.controller); // Perform crossover and controller creation
      childController.brain.mutate(); // Mutate the child's brain

      const newEnemy = this.population[i].clone();

      newEnemy.controller.brain = childController.brain;
      children.push(newEnemy);
    }

    // Update the population with the new children
    this.population = children.slice();
    this.generation++;

    this.population.forEach((element) => {
      element.controller.brain.generateNetwork();
    });
    this.bestPlayer.controller.lifespan = 0;
    this.bestPlayer.controller.dead = false;
    this.bestPlayer.controller.score = 1;
  }

  calculateFitness() {
    let currentMax = 0;

    this.population.forEach((enemy) => {
      enemy.controller.calculateFitness(enemy.transform, this.player);

      if (enemy.controller.fitness > this.bestFitness) {
        this.bestFitness = enemy.controller.fitness;
        // console.log(enemy.clone());

        this.bestPlayer = enemy.clone();

        this.bestPlayer.controller.brain.id = "BestGenome";
      }

      if (enemy.controller.fitness > currentMax)
        currentMax = enemy.controller.fitness;
    });

    // Normalize
    this.population.forEach((enemy) => {
      enemy.controller.fitness /= currentMax;
    });
  }

  fillMatingPool() {
    this.matingPool = [];
    this.population.forEach((enemy) => {
      const n = Math.floor(enemy.controller.fitness * 100);
      this.matingPool.push(...Array.from({ length: n }, () => enemy));
    });
  }

  selectPlayer() {
    if (this.matingPool.length === 0) {
      // If mating pool is empty, return a random individual from the population
      let rand = Math.floor(Math.random() * this.population.length);
      return this.population[rand];
    } else {
      // Select a player from the mating pool
      let rand = Math.floor(Math.random() * this.matingPool.length);
      return this.matingPool[rand];
    }
  }

  getAverageScore() {
    let avSum = this.population.reduce(
      (sum, enemy) => sum + enemy.controller.score,
      0,
    );
    return avSum / this.population.length;
  }
}

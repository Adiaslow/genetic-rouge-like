/**
 * @class EnemyManager
 * @classdesc Manages the enemies in the game.
 */
class EnemyManager {
  constructor(player, numPopulations, cycles, maxLifeSpan) {
    this.player = player;
    this.numPopulations = numPopulations;
    this.maxLifeSpan = maxLifeSpan;
    this.populations = [];

    for (let i = 0; i < numPopulations; i++) {
      this.populations.push(new EnemyPopulation(10, player));
    }

    this.populationScores = Array(numPopulations).fill(0);

    // Add a frame counter and update interval
    this.frameCounter = 0;
    this.updateInterval = 4; // Adjust the interval as needed
  }

  update() {
    this.frameCounter++;
    this.updatePopulations();
    this.updatePopulationScores();
    this.adjustMaxLifeSpan();
    this.performNaturalSelection();

    /*
    // Check if the frame counter has reached the update interval
    if (this.frameCounter >= this.updateInterval) {
      this.frameCounter = 0; // Reset the frame counter

    }
    */
    /*
    fill(255);
    textSize(24);
    for (let i = 0; i < this.numPopulations; i++) {
      text(
        "Population " + i + " Fitness: " + this.populations[i].bestFitness,
        width - 500,
        30 * (i + 1),
      );
    }
    */
  }

  updatePopulations() {
    for (const population of this.populations) {
      if (!population.done()) population.updateAlive();
    }
  }

  adjustMaxLifeSpan() {
    if (this.populations[0].generation % 20 === 0) this.maxLifeSpan += 10;
  }

  updatePopulationScores() {
    // Calculate the average score for each population
    const averageScores = this.populations.map((population) =>
      population.getAverageScore(),
    );

    // Optionally, you can reset scores for each new evaluation
    // this.populationScores.fill(0);

    // Update scores for all populations, not just the winning one, to track progress over time
    averageScores.forEach((averageScore, index) => {
      this.populationScores[index] = averageScore;
    });

    // Log the scores to monitor changes over time; remove logs in production
    // console.log("Average scores:", averageScores);
    // console.log("Population scores:", this.populationScores);
  }

  performNaturalSelection() {
    for (const population of this.populations) {
      population.naturalSelection();
    }
  }
}

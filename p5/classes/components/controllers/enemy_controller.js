let maxScore = 0;

class EnemyController extends Controller {
  static enemyImages = null;

  constructor(brain) {
    super();
    this.brain = brain || new Genome(6, 3, 0);
    this.fitness = 0;
    this.score = 0;
    this.lifespan = 0;
    this.dead = false;
    this.decisions = []; // Outputs of the neural network
    this.vision = []; // Inputs to the neural network

    this.attackDamage = 10;

    this.health = 100; // or any starting health value
    this.healthBarHeight = 5; // Height of the health bar
    this.healthBarColor = color(0, 255, 0); // Green color for healthy state
    this.damageColor = color(255, 0, 0); // Red color for damaged state

    this.jumpCooldown = 0;
    this.jumpCooldownDuration = 400.0;
    this.groundTolerance = 0.1;

    this.attackCooldown = 0;
    this.attackCooldownDuration = 1000.0;
    this.isAttacking = false;

    this.enemyAnimations = {
      idle: jellyFishAnimations.idle,
      walk: jellyFishAnimations.walk,
      hurt: jellyFishAnimations.hurt,
      death: jellyFishAnimations.death,
      attack: jellyFishAnimations.attack,
    };

    this.currentAnimation = jellyFishAnimations.idle;

    if (EnemyController.enemyImages) {
      this.setImages(EnemyController.enemyImages);
    }
  }

  static setImages(images) {
    EnemyController.enemyImages = images;
  }

  setImages(images) {
    const { idle, walk, hurt, death, attack } = this.enemyAnimations;
    [idle, walk, hurt, death, attack].forEach(
      (animation) => (animation[1] = images[animation[0]]),
    );
    this.currentAnimation = idle[1];
  }

  crossover(parent) {
    // The crossover function should combine the genetics of two controllers
    // to produce a child with a new Genome.
    const childController = new EnemyController();
    childController.brain = this.brain.crossover(parent.brain);
    childController.brain.mutate(); // Assumes Genome has a mutate method
    return childController;
  }

  look(physics, transform, player) {
    const dist = p5.Vector.dist(player.transform.position, transform.position);
    const targetAngle = atan2(
      player.transform.position.y - transform.position.y,
      player.transform.position.x - transform.position.x,
    );

    this.vision = [
      physics.velocity.x,
      physics.velocity.y,
      dist,
      targetAngle,
      player.transform.position.z,
      player.controller.isAttacking,
    ];
  }

  think() {
    // Add noise to the vision array to introduce variability
    const visionWithNoise = this.vision.map(
      (v) => v + (Math.random() - 0.5) * 0.1,
    );
    this.decisions = this.brain.feedForward(visionWithNoise);

    // Debug: Log decisions to monitor behavior
    // console.log("Decisions:", this.decisions);
  }

  move() {
    if (this.decisions.length > 0) {
      let x = this.decisions[0];
      // const sigmoid = (x) => 1 / (1 + Math.exp(-x));
      let moveAngle = x * TWO_PI;

      // Adjust moveAngle to prevent consistent directional bias
      moveAngle += (Math.random() - 0.5) * 0.2; // Add a small random variation

      const moveVector = p5.Vector.fromAngle(moveAngle);
      return moveVector;
    }
    return createVector(0, 0, 0);
  }

  update(transform, player) {
    // Calculate the distance from the enemy to the player.
    const dist = p5.Vector.dist(player.transform.position, transform.position);

    // Define proximity in which the enemy gets more points.
    const proximityThreshold = width;
    // Scale the score awarded based on how close the enemy gets to the player.
    // const proximityScore = 1 / dist;
    // const proximityScore = 0;

    const proximityScore =
      dist < proximityThreshold ? proximityThreshold - dist : 0;

    // Combine the additional proximity score with the existing score, applying any scaling or caps as desired.
    // For example, you might want to scale the score by how long the enemy has been alive.
    this.score += proximityScore; // * someSurvivalMultiplier;
    // Optionally cap the score if necessary.
    const scoreCap = 1000; // Arbitrary cap value for the score.
    this.score = Math.min(this.score, scoreCap);

    // Maintain a record of the maximum score if needed.
    maxScore = Math.max(maxScore, this.score);

    // Track how long the enemy has been alive.
    this.lifespan++;

    // Other behaviors or objectives can be rewarded here as well:
    // Avoidance of player's attacks, collection of in-game items, completion of objectives, etc.

    // Example: Score for surviving player's attacks.
    /*
    if (this.hasAvoidedAttack) {
      this.score += avoidanceScore;
    }
    */
  }

  calculateFitness(transform, player) {
    // Calculate the distance between the enemy and the player
    const distanceToPlayer = p5.Vector.dist(
      transform.position,
      player.transform.position,
    );

    // Normalize the distance to a value between 0 and 1 (you can adjust the divisor as needed)
    const normalizedDistance = 1 / (distanceToPlayer + 1);

    // Update the fitness, considering both the score and the distance
    this.fitness = this.score * normalizedDistance;
  }
  /*
  calculateFitness() {
    // ... Calculate the fitness of the agent ...
    // this.fitness = this.score; // Placeholder: directly using the score as fitness
    this.fitness = this.score / (this.brain.calculateWeight() * 0.5);
  }
  */

  drawHealthBar(transform) {
    // Calculate the position for drawing the health bar above the enemy's head
    const barX = transform.position.x + transform.size.x * 0.5; // Adjust based on your enemy's size
    const barY =
      transform.position.y - transform.position.z - transform.size.y * 0.1; // Adjust based on your enemy's size and position

    // Draw the background of the health bar (full health)
    fill(this.healthBarColor);
    rect(barX, barY, 32, this.healthBarHeight);

    // Draw the actual health bar based on the current health
    const healthWidth = (this.health / this.maxHealth) * 64;
    fill(this.health > 0 ? this.healthBarColor : this.damageColor);
    rect(barX, barY, healthWidth, this.healthBarHeight);
  }

  handleJumpInput(transform, enemyMovementInput, physics) {
    if (
      Math.abs(transform.position.z) < this.groundTolerance &&
      this.jumpCooldown <= 0
    ) {
      if (1 / this.decisions[1] < 0.5) {
        this.jumpCooldown = this.jumpCooldownDuration;
        // enemyMovementInput.add(createVector(0, 0, this.decisions[1]));
      }
    }
    this.jumpCooldown = Math.max(0, this.jumpCooldown - deltaTime);

    return enemyMovementInput;
  }

  handleAnimationAndAttackInput(transform, physics, enemyMovementInput) {
    if (
      this.attackCooldown <= 0 &&
      !this.isAttacking &&
      1 / this.decisions[2] < 0.5
    ) {
      this.currentAnimation = this.enemyAnimations.attack;
      this.attackCooldown = this.attackCooldownDuration;
      this.isAttacking = true;
    }

    if (this.isAttacking) {
      this.currentAnimation.play();

      if (frameCount % this.currentAnimation.numFrames() === 0) {
        this.isAttacking = false;
      }

      this.attackCooldown = Math.max(0, this.attackCooldown - deltaTime);
      return true;
    }

    this.currentAnimation =
      enemyMovementInput.mag() !== 0
        ? this.enemyAnimations.walk
        : this.enemyAnimations.idle;

    this.attackCooldown = Math.max(0, this.attackCooldown - deltaTime);
    return false;
  }

  isCollidingWithPlayer(transform, collider, player) {
    // Calculate the distance between the enemy and the player
    const distanceToPlayer = p5.Vector.dist(
      transform.position,
      player.transform.position,
    );
    // If the distance is less than the sum of the enemy and player's sizes, they are colliding
    return distanceToPlayer < transform.size.x + player.transform.size.x;
  }

  handleInput(collider, transform, physics, player) {
    let enemyMovementInput = createVector(0, 0, 0);
    this.look(physics, transform, player);
    this.think();

    // Get the movement vector
    const moveVector = this.move();

    // Apply the movement vector to the enemy's position
    enemyMovementInput.add(moveVector);

    // Update and handle other actions
    this.update(transform, player);
    enemyMovementInput = this.handleJumpInput(
      transform,
      enemyMovementInput,
      physics,
    );
    let isAttacking = this.handleAnimationAndAttackInput(
      transform,
      physics,
      enemyMovementInput,
    );

    if (
      isAttacking &&
      this.isCollidingWithPlayer(transform, collider, player)
    ) {
      let damagedPlayer = player.controller.takeDamage(this.attackDamage);
      if (damagedPlayer) {
        this.score += 1;
      }
    }

    // Apply the final movement vector to the enemy's position
    transform.position.add(enemyMovementInput);

    this.drawHealthBar(transform); // Draw the health bar

    // Display the enemy with the current animation
    image(
      this.currentAnimation,
      transform.position.x,
      transform.position.y - transform.position.z,
      64,
      64,
    );

    // Return the normalized movement vector
    return enemyMovementInput.normalize();
  }
}

/**
 * @class PlayerController
 * @classdesc The PlayerController class is a Controller subclass that handles input for the Player class.
 * @extends Controller
 */
class PlayerController extends Controller {
  /**
   * @constructor
   */
  constructor(playerAnimations, fxAnimations) {
    super();
    this.jumpCooldown = 0;
    this.jumpCooldownDuration = 400.0;
    this.groundTolerance = 0.1;

    this.pivotLeftCooldown = 0;
    this.pivotRightCooldown = 0;
    this.pivotCooldownDuration = 200.0;
    this.attackCooldown = 0;
    this.attackCooldownDuration = 1000.0;
    this.isAttacking = false;
    this.hurtCooldown = 0;
    this.hurtCooldownDuration = 1000.0; // Adjust the duration as needed

    this.health = 100; // or any starting health value
    this.maxHealth = 100; // or any starting health value
    this.healthBarHeight = 20; // Height of the health bar
    this.healthBarColor = color(0, 255, 0); // Green color for healthy state
    this.damageColor = color(255, 0, 0); // Red color for damaged state

    this.playerAnimations = {
      idle: [false, playerAnimations.idle],
      walkLeft: [false, playerAnimations.walkLeft],
      walkRight: [false, playerAnimations.walkRight],
      hurt: [false, playerAnimations.hurt],
      death: [false, playerAnimations.death],
      attackLeft: [false, playerAnimations.attackLeft],
      attackRight: [false, playerAnimations.attackRight],
    };

    this.currentAnimation = this.playerAnimations.idle[1];

    this.fxAnimations = {
      jumpUp: [false, fxAnimations.jumpUp],
      jumpDown: [false, fxAnimations.jumpUp],
      pivotLeft: [false, fxAnimations.pivotLeft],
      pivotRight: [false, fxAnimations.pivotRight],
    };
  }

  /**
   * @method handleJumpInput
   * @methoddesc Handles jump input for the player.
   * @param {Transform} transform The transform of the player.
   * @param {p5.Vector} playerMovementInput The player's movement input.
   * @returns {p5.Vector} The player's movement input.
   */
  handleJumpInput(transform, playerMovementInput, physics) {
    // Handle jump input (Space key) with cooldown
    if (
      keyIsDown(32) &&
      Math.abs(transform.position.z) < this.groundTolerance &&
      this.jumpCooldown <= 0
    ) {
      playerMovementInput.add(createVector(0, 0, 1));
      this.jumpAnimationTransform = new Transform(
        Object.assign({}, transform.position),
        Object.assign({}, transform.size),
      );
      this.fxAnimations.jumpUp[0] = true;
      this.fxAnimations.jumpUp[1].reset();
      this.fxAnimations.jumpUp[1].play();
      this.jumpCooldown = this.jumpCooldownDuration;
    }

    if (this.fxAnimations.jumpUp[0] & (this.jumpCooldown > 0)) {
      image(
        this.fxAnimations.jumpUp[1],
        this.jumpAnimationTransform.position.x,
        this.jumpAnimationTransform.position.y +
          this.jumpAnimationTransform.size.y / 2,
        this.jumpAnimationTransform.size.x,
        this.jumpAnimationTransform.size.y,
      );
    } else if (this.fxAnimations.jumpUp[0] & (this.jumpCoolDown <= 0)) {
      this.fxAnimations.jumpUp[1].pause();
      this.fxAnimations.jumpUp[0] = false;
    }

    this.jumpCooldown = Math.max(0, this.jumpCooldown - deltaTime);

    return playerMovementInput;
  }

  handleLeftInput(transform, playerMovementInput, physics) {
    if (keyIsDown(65) & !keyIsDown(68)) {
      playerMovementInput.add(createVector(-1, 0, 0));

      if ((physics.velocity.x > 4) & (this.pivotLeftCooldown <= 0)) {
        this.pivotLeftAnimationTransform = new Transform(
          Object.assign({}, transform.position),
          Object.assign({}, transform.size),
        );
        this.fxAnimations.pivotLeft[0] = true;
        this.fxAnimations.pivotLeft[1].reset();
        this.fxAnimations.pivotLeft[1].play();
        this.pivotLeftCooldown = this.pivotCooldownDuration;
      }
    }

    if (this.fxAnimations.pivotLeft[0] & (this.pivotLeftCooldown > 0)) {
      image(
        this.fxAnimations.pivotLeft[1],
        this.pivotLeftAnimationTransform.position.x +
          this.pivotLeftAnimationTransform.size.x / 2,
        this.pivotLeftAnimationTransform.position.y +
          this.pivotLeftAnimationTransform.size.y / 4,
        this.pivotLeftAnimationTransform.size.x,
        this.pivotLeftAnimationTransform.size.y,
      );
    } else if (this.fxAnimations.pivotLeft[0] & (this.pivotLeftCooldown <= 0)) {
      this.fxAnimations.pivotLeft[1].pause();
      this.fxAnimations.pivotLeft[0] = false;
    }

    this.pivotLeftCooldown = Math.max(0, this.pivotLeftCooldown - deltaTime);

    return playerMovementInput;
  }

  handleRightInput(transform, playerMovementInput, physics) {
    if (keyIsDown(68) & !keyIsDown(65)) {
      playerMovementInput.add(createVector(1, 0, 0));

      if ((physics.velocity.x < -4) & (this.pivotRightCooldown <= 0)) {
        this.pivotRightAnimationTransform = new Transform(
          Object.assign({}, transform.position),
          Object.assign({}, transform.size),
        );
        this.fxAnimations.pivotRight[0] = true;
        this.fxAnimations.pivotRight[1].reset();
        this.fxAnimations.pivotRight[1].play();
        this.pivotRightCooldown = this.pivotCooldownDuration;
      }
    }

    if (this.fxAnimations.pivotRight[0] & (this.pivotRightCooldown > 0)) {
      image(
        this.fxAnimations.pivotRight[1],
        this.pivotRightAnimationTransform.position.x -
          this.pivotRightAnimationTransform.size.x / 2,
        this.pivotRightAnimationTransform.position.y +
          this.pivotRightAnimationTransform.size.y / 4,
        this.pivotRightAnimationTransform.size.x,
        this.pivotRightAnimationTransform.size.y,
      );
    } else if (
      this.fxAnimations.pivotRight[0] &
      (this.pivotRightCooldown <= 0)
    ) {
      this.fxAnimations.pivotRight[1].pause();
      this.fxAnimations.pivotRight[0] = false;
    }

    this.pivotRightCooldown = Math.max(0, this.pivotRightCooldown - deltaTime);

    return playerMovementInput;
  }

  handleUpInput(transform, playerMovementInput, physics) {
    if (keyIsDown(87)) {
      playerMovementInput.add(createVector(0, -1, 0));
    }
    return playerMovementInput;
  }

  handleDownInput(transform, playerMovementInput, physics) {
    if (keyIsDown(83)) {
      playerMovementInput.add(createVector(0, 1, 0));
    }
    return playerMovementInput;
  }

  handleAnimationAndAttackInput(transform, physics, playerMovementInput) {
    // Check and handle the hurt animation
    if (this.isHurt) {
      if (this.hurtCooldown > 0) {
        this.hurtCooldown -= deltaTime;
        this.currentAnimation = this.playerAnimations.hurt[1];
        this.currentAnimation.play();

        if (
          this.currentAnimation.getCurrentFrame() ===
          this.currentAnimation.numFrames() - 1
        ) {
          this.isHurt = false; // Reset isHurt when hurt animation finishes
        }
      }
      return false; // Do not process attack input if hurt
    }

    // Handle attack input
    if (this.attackCooldown <= 0 && mouseIsPressed) {
      let attackAnimation;
      // Determine the correct attack animation based on player input
      switch (true) {
        case playerMovementInput.x < 0:
          attackAnimation = this.playerAnimations.attackLeft[1];
          break;
        case playerMovementInput.x > 0:
          attackAnimation = this.playerAnimations.attackRight[1];
          break;
        default:
          attackAnimation =
            random(-1, 1) >= 0
              ? this.playerAnimations.attackLeft[1]
              : this.playerAnimations.attackRight[1];
          break;
      }

      this.currentAnimation = attackAnimation;
      this.currentAnimation.reset();
      this.currentAnimation.play();
      this.isAttacking = true;
      this.attackCooldown = this.attackCooldownDuration;
    }

    if (this.isAttacking) {
      // Process the attack animation
      this.currentAnimation.play();

      if (
        this.currentAnimation.getCurrentFrame() ===
        this.currentAnimation.numFrames() - 1
      ) {
        this.isAttacking = false; // Reset isAttacking when attack animation finishes
      }
    }

    // Update movement or idle animations if not attacking or hurt
    if (!this.isAttacking && !this.isHurt) {
      // Determine and set the correct movement or idle animation
      switch (true) {
        case playerMovementInput.x > 0:
          this.currentAnimation = this.playerAnimations.walkRight[1];
          break;
        case playerMovementInput.x < 0:
          this.currentAnimation = this.playerAnimations.walkLeft[1];
          break;
        case playerMovementInput.x === 0 && playerMovementInput.y !== 0:
          // Adjust this condition based on your specific movement logic
          this.currentAnimation = this.playerAnimations.walkLeft[1];
          break;
        case playerMovementInput.mag() === 0:
          this.currentAnimation = this.playerAnimations.idle[1];
          break;
      }
    }

    // Reduce cooldowns
    this.attackCooldown = Math.max(0, this.attackCooldown - deltaTime);
    this.hurtCooldown = Math.max(0, this.hurtCooldown - deltaTime);

    return this.isAttacking;
  }

  takeDamage(damage) {
    if (this.damageCooldown <= 0 && !this.isHurt) {
      this.health = Math.max(0, this.health - damage); // Ensure health does not go negative
      this.damageCooldown = this.damageCooldownDuration;

      if (this.health <= 0) {
        this.currentAnimation = this.playerAnimations.death[1];
        this.currentAnimation.reset();
        this.currentAnimation.play();
        // Add any additional logic for player death
      } else {
        this.isHurt = true;
        this.hurtCooldown = this.hurtCooldownDuration;
        this.currentAnimation = this.playerAnimations.hurt[1];
        this.currentAnimation.reset();
        this.currentAnimation.play();
      }
      return false;
    }
    return true;
  }

  drawHealthBar(transform) {
    // Calculate the position for drawing the health bar above the enemy's head
    const barX = 10; // Adjust based on your enemy's size
    const barY = 10; // Adjust based on your enemy's size and position

    // Draw the background of the health bar (full health)
    fill(255);
    rect(barX, barY, 256, this.healthBarHeight);

    // Draw the actual health bar based on the current health
    const healthWidth = (this.health / this.maxHealth) * 256;
    // Calculate the health ratio
    let healthRatio = this.health / this.maxHealth;

    // Calculate the RGB values based on the health ratio
    let r, g, b;
    if (healthRatio >= 0.5) {
      // Green to yellow transition
      r = 255 * (1 - healthRatio) * 2;
      g = 255;
      b = 0;
    } else {
      // Yellow to red transition
      r = 255;
      g = 255 * healthRatio * 2;
      b = 0;
    }

    // Set the fill color
    fill(r, g, b);
    rect(barX, barY, healthWidth, this.healthBarHeight);
    textSize(18);
    fill(0);
    text(this.health, 12, 26);

    this.damageCooldown = Math.max(0, this.damageCooldown - deltaTime);
  }

  /**
   * @method handleInput
   * @methoddesc Handles input for the Player class.
   */
  handleInput(transform, physics) {
    let playerMovementInput = createVector(0, 0, 0);

    // Handle movement input (W, A, S, D keys)
    playerMovementInput = this.handleUpInput(
      transform,
      playerMovementInput,
      physics,
    );
    playerMovementInput = this.handleDownInput(
      transform,
      playerMovementInput,
      physics,
    );

    playerMovementInput = this.handleLeftInput(
      transform,
      playerMovementInput,
      physics,
    );

    playerMovementInput = this.handleRightInput(
      transform,
      playerMovementInput,
      physics,
    );

    playerMovementInput = this.handleJumpInput(
      transform,
      playerMovementInput,
      physics,
    );

    let isAttacking = this.handleAnimationAndAttackInput(
      transform,
      physics,
      playerMovementInput,
    );
    this.drawHealthBar(transform); // Draw the health bar

    image(
      this.currentAnimation,
      transform.position.x,
      transform.position.y - transform.position.z,
      64,
      64,
    );
    return playerMovementInput.normalize();
  }
}

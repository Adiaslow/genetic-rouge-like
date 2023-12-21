/**
 * @class PlayerController
 * @classdesc The PlayerController class is a Controller subclass that handles input for the Player class.
 * @extends Controller
 */
class PlayerController extends Controller {
  /**
   * @constructor
   */
  constructor() {
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

    this.playerAnimations = {
      idle: [false, loadImage("sprites/crab/crab-idle.gif")],
      walkLeft: [false, loadImage("sprites/crab/crab-walk-left.gif")],
      walkRight: [false, loadImage("sprites/crab/crab-walk-right.gif")],
      hurt: [false, loadImage("sprites/crab/crab-hurt.gif")],
      death: [false, loadImage("sprites/crab/crab-death.gif")],
      attackLeft: [false, loadImage("sprites/crab/crab-attack-left.gif")],
      attackRight: [false, loadImage("sprites/crab/crab-attack-right.gif")],
    };

    this.currentAnimation = this.playerAnimations.idle[1];

    this.fxAnimations = {
      jumpUp: [false, loadImage("sprites/smoke/jump-smoke.gif")],
      jumpDown: [false, loadImage("sprites/smoke/jump-smoke.gif")],
      pivotLeft: [false, loadImage("sprites/smoke/pivot-left-smoke.gif")],
      pivotRight: [false, loadImage("sprites/smoke/pivot-right-smoke.gif")],
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
    let isAttacking = false;

    if (this.attackCooldown <= 0 && !this.isAttacking && mouseIsPressed) {
      let attackAnimation;

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

      attackAnimation.reset();
      this.currentAnimation = attackAnimation;
      this.attackCooldown = this.attackCooldownDuration;
      this.isAttacking = true;
    }

    if (this.isAttacking) {
      // Render the attack animation
      this.currentAnimation.play(); // Assuming play() method exists
      isAttacking = true;

      // Check if the attack animation has finished playing
      if (
        this.currentAnimation.getCurrentFrame() ===
        this.currentAnimation.numFrames() - 1
      ) {
        this.isAttacking = false;
      }

      this.attackCooldown = Math.max(0, this.attackCooldown - deltaTime);
      return isAttacking;
    }

    // Update movement or idle animations here
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

    this.attackCooldown = Math.max(0, this.attackCooldown - deltaTime);

    return isAttacking;
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

/**
 * @class EnemyController
 * @classdesc The EnemyController class is responsible for handling input for the Enemy class.
 */
class EnemyController extends Controller {
  constructor() {
    super();
    this.jumpCooldown = 0;
    this.jumpCooldownDuration = 400.0;
    this.groundTolerance = 0.1;

    this.attackCooldown = 0;
    this.attackCooldownDuration = 1000.0;
    this.isAttacking = false;

    this.enemyAnimations = {
      idle: [false, loadImage("sprites/jelly-fish/jelly-fish-idle.gif")],
      walk: [false, loadImage("sprites/jelly-fish/jelly-fish-walk.gif")],
      hurt: [false, loadImage("sprites/jelly-fish/jelly-fish-hurt.gif")],
      death: [false, loadImage("sprites/jelly-fish/jelly-fish-death.gif")],
      attack: [false, loadImage("sprites/jelly-fish/jelly-fish-attack.gif")],
    };

    this.currentAnimation = this.enemyAnimations.idle[1];
  }

  handleJumpInput(transform, enemyMovementInput, physics) {
    // Handle jump input (Space key) with cooldown
    if (
      Math.abs(transform.position.z) < this.groundTolerance &&
      this.jumpCooldown <= 0
    ) {
      // enemyMovementInput.add(createVector(0, 0, 1));
    }
    return enemyMovementInput;
  }

  handleAnimationAndAttackInput(transform, physics, enemyMovementInput) {
    let isAttacking = false;

    if (this.attackCooldown <= 0 && !this.isAttacking && mouseIsPressed) {
      let attackAnimation;
      attackAnimation = this.enemyAnimations.attack[1];

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
      case enemyMovementInput.mag() !== 0:
        this.currentAnimation = this.enemyAnimations.walk[1];
      default:
        this.currentAnimation = this.enemyAnimations.idle[1];
        break;
    }

    this.attackCooldown = Math.max(0, this.attackCooldown - deltaTime);

    return isAttacking;
  }

  /**
   * @method handleInput
   * @methoddesc Handles input for the Player class.
   */
  handleInput(transform, physics, player) {
    let playerLocation = p5.Vector.sub(
      player.transform.position,
      transform.position,
    );
    let enemyMovementInput = p5.Vector.add(
      playerLocation.mult(0.0001),
      createVector(random(-1, 1), random(-1, 1), 0),
    );

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

    image(
      this.currentAnimation,
      transform.position.x,
      transform.position.y - transform.position.z,
      64,
      64,
    );
    return enemyMovementInput.normalize().mult(1);
  }
}

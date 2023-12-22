/**
 * @class EnemyAgent
 * @classdesc The EnemyAgent class. Enemies are Agents that have an enemy AI controller.
 * @extends Agent
 */
class EnemyAgent extends Agent {
  constructor(collider, physics, shadow, transform, controller) {
    super(collider, physics, shadow, transform, controller);
  }

  update(player) {
    if (this.collider !== null) {
      this.collider.update(this.transform);
    }

    let enemyMovementInput = createVector(0, 0, 0);
    if (this.controller !== null) {
      enemyMovementInput.set(
        this.controller.handleInput(
          this.collider,
          this.transform,
          this.physics,
          player,
        ),
      );
    }

    if (this.physics !== null) {
      // console.log(enemyMovementInput);
      this.physics.apply(this.transform, this.collider, enemyMovementInput);
    }

    if (this.shadow !== null) {
      this.shadow.render(this.transform);
    }
  }

  clone() {
    const cloneCollider = new CircleCollider(
      this.collider.center.copy(),
      this.collider.radius,
    );
    const clonePhysics = new Physics(
      this.physics.mass,
      this.physics.velocity.copy(),
      this.physics.acceleration.copy(),
      this.physics.maxSpeed,
    );
    const cloneShadowRenderer = new ShadowRenderer(this.shadow.size);
    const cloneTransform = new Transform(
      this.transform.position.copy(),
      this.transform.size.copy(),
    );
    const cloneController = new EnemyController(this.controller.brain);

    const clone = new EnemyAgent(
      cloneCollider,
      clonePhysics,
      cloneShadowRenderer,
      cloneTransform,
      cloneController,
    );
    //console.log(clone);
    return clone;
  }
}

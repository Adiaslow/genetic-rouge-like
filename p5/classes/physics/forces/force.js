/**
 * Defines the parent class for all forces.
 * @abstract
 */
class Force {
  constructor(force = createVector(0, 0)) {
    this.force = force;
  }
}

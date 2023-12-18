/**
 * Defines the parent class for all of the forces.
 */

/** @abstract */
class Force {
  constructor(force, isActive = true) {
    this.isActive = isActive;
    this.force = force;
  }

  apply(physics) {
    physics.acceration += this.force;
  }
  
  activate() {
    this.isActive = true;
  }
  
  deactivate() {
    this.isActive = false;
  }
}

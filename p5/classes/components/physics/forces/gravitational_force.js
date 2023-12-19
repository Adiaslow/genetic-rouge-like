/**
 * @class GravitationalForce
 * @classdesc A force that pulls objects towards the ground (the negative z director).
 * @extends{Force}
 */
class GravitationalForce extends Force {
  /**
   * @constructor
   */
  constructor(netForce) {
    super();
    this.force = createVector(0, 0, -9.8);
  }
}

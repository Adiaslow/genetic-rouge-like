/**
 * @class DragForce
 * @classdesc A force that applies drag to a rectangular prism-shaped object moving through air.
 * @extends Force
 */
class DragForce extends Force {
  /**
   * @constructor
   * @param {p5.Vector} velocity - The velocity of the entity.
   * @param {Transform} transform - The transform of the entity.
   */
  constructor(velocity, isMoving, transform) {
    super();

    if (isMoving) {
      // Assume a drag coefficient for a rectangular prism
      const dragCoefficient = 1.28;

      // Calculate the cross-sectional area of the prism
      const crossSectionalArea =
        transform.size.x * 0.01 * transform.size.y * 0.01;

      // Assume air density (rho) at sea level
      const airDensity = 1.225; // kg/m^3

      // Calculate the magnitude of the drag force: Fd = 0.5 * Cd * A * rho * v^2
      const dragMagnitude =
        0.5 *
        dragCoefficient *
        crossSectionalArea *
        airDensity *
        velocity.magSq();

      // Drag force vector is in the opposite direction to the velocity
      const dragDirection = velocity.copy().normalize().mult(-0.2, -0.2, -0.05);

      // Set the drag force vector, scaled by drag magnitude
      this.force = dragDirection.mult(dragMagnitude);
    } else {
      this.force = createVector(0, 0, 0);
    }
  }
}

/**
 * Defines a CircleRenderer class which renders a circle for a Game Object.
 * @extends {Renderer}
 */
class CircleRenderer extends Renderer {
  constructor(isActive = true, diameter = 50) {
    super(isActive);
    this.diameter = diameter;
  }
  
  render(transform) {
    circle(
      transform.position.x,
      transform.position.y,
      this.diameter
    );
  }
}

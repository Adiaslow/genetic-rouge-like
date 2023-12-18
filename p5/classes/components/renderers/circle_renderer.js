/**
 * Defines a CircleRenderer class which renders a circle for a Game Object.
 * @extends {Renderer}
 */
class CircleRenderer extends Renderer {
  constructor(isActive = true, diameter = 50) {
    super(isActive);
    this.diameter = diameter;
  }

  /**
   * @method render
   * @methoddesc Renders a circle at the location of the Game Object.
   */
  render(transform) {
    if (this.isActive) {
      fill(255);
      ellipse(
        transform.position.x,
        transform.position.y,
        this.diameter,
        this.diameter,
      );
    }
  }
}

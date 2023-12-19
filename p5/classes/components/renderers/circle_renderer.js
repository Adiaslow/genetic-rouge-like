/**
 * Defines a CircleRenderer class which renders a circle for a Game Object.
 * @extends {Renderer}
 */
class CircleRenderer extends Renderer {
  constructor(diameter, isActive) {
    super(isActive);
    this.diameter = diameter || 50;
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

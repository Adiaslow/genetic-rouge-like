/**
 * Defines a ShadowRenderer class which renders a shadow for a Game Object.
 * @extends {Renderer}
 */
class ShadowRenderer extends Renderer {
  constructor(size, isActive) {
    super(isActive);
    this.size = size || 50; // Default width
  }

  /**
   * @method render
   * @methoddesc Renders a shadow at the location of the Game Object.
   */
  render(transform) {
    if (this.isActive) {
      fill(0, 0, 0, 50);
      noStroke();
      ellipse(
        transform.position.x + this.size * 0.5,
        transform.position.y + this.size,
        this.size * 0.6,
        this.size * 0.25,
      );
    }
  }
}

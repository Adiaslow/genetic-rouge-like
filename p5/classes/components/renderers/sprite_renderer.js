/**
 * @class SpriteRenderer
 * @classdesc Defines a SpriteRenderer class which renders a sprite for a Game Object.
 * @extends {Renderer}
 */
class SpriteRenderer extends Renderer {
  /**
   * @constructor
   * @param {p5.Image} sprite - The image or sprite to render.
   * @param {number} width - The width of the sprite.
   * @param {number} height - The height of the sprite.
   * @param {boolean} isActive - Whether or not the renderer is active.
   */
  constructor(sprite, width, height, hasShadow, isActive) {
    super(isActive);
    this.sprite = sprite; // The image or sprite to render
    this.width = width || 50; // Default width
    this.height = height || 50; // Default height
    this.hasShadow = hasShadow || false;
  }

  /**
   * @method render
   * @methoddesc Renders the sprite at the location of the Game Object.
   */
  render(transform) {
    if (this.isActive) {
      if (this.hasShadow) {
        fill(0, 0, 0, 50);
        noStroke();
        ellipse(
          transform.position.x + this.width / 2,
          transform.position.y + this.height - 10,
          this.width,
          this.height / 2,
        );
      }
      image(
        this.sprite,
        transform.position.x,
        transform.position.y,
        this.width,
        this.height,
      );
    }
  }
}

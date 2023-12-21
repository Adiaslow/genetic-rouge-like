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
  constructor(sprite, width, height, isActive) {
    super(isActive);
    this.sprite = sprite; // The image or sprite to render
    this.width = width || 64; // Default width
    this.height = height || 64; // Default height
  }

  /**
   * @method render
   * @methoddesc Renders the sprite at the location of the Game Object.
   */
  render(transform) {
    if (this.isActive) {
      image(
        this.sprite,
        transform.position.x,
        transform.position.y - transform.position.z,
        this.width,
        this.height,
      );
    }
  }
}

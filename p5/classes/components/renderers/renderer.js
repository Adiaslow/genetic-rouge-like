/**
 * @class Renderer
 * @classdesc The generic Renderer class. Renderers are components that render a Game Object.
 * @abstract
 */
class Renderer {
  /**
   * @constructor
   * @param {boolean} isActive - Whether or not the renderer is active.
   */
  constructor(isActive) {
    this.isActive = isActive || true;
  }

  /**
   * @method activate
   * @methoddesc Activates the renderer.
   */
  activate() {
    this.isActive = true;
  }

  /**
   * @method deactivate
   * @methoddesc Deactivates the renderer.
   */
  deactivate() {
    this.isActive = false;
  }

  /**
   * @method render
   * @methoddesc Renders the Game Object.
   * @param {Transform} transform - The transform of the Game Object.
   * @abstract
   */
  render(transform) {
    throw new Error("Cannot call abstract method render.");
  }
}

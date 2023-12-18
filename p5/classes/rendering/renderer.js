/**
 * @abstract
 * Defines the Renderer class which is responsible for rendering Game Objects.
 */
class Renderer {
  constructor(isActive = true) {
    this.isActive = isActive;
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  render(transform) {
    console.log("Rendering...");
  }
}
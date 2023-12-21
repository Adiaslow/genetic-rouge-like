/**
 * @class AnimationRenderer
 * @classdesc Defines an AnimationRenderer class which renders an animation.
 * @extends {Renderer}
 */
class StationaryAnimationRenderer extends Renderer {
  /**
   * @constructor
   * @param {p5.Image[]} frames - An array of image frames for the animation.
   * @param {number} frameWidth - The width of each frame.
   * @param {number} frameHeight - The height of each frame.
   * @param {number} frameRate - The frame rate of the animation.
   * @param {boolean} isActive - Whether or not the renderer is active.
   */
  constructor(
    gif,
    startingFrame,
    frameWidth,
    frameHeight,
    frameRate,
    isActive,
  ) {
    super(isActive);
    this.gif = gif; // The gif to render
    this.startingFrame = startingFrame || 0; // Default starting frame
    this.frameWidth = frameWidth || 64; // Default frame width
    this.frameHeight = frameHeight || 64; // Default frame height
    this.frameRate = frameRate || 60; // Default frame rate
    this.currentFrame = 0; // Current frame index
    this.frameTimer = 0; // Timer to control frame switching
  }

  /**
   * @method update
   * @methoddesc Updates the animation frame based on the frame rate.
   */
  update() {
    if (this.isActive) {
      // Update frame timer
      this.frameTimer += deltaTime / 1000;

      // Switch to the next frame if enough time has passed
      if (this.frameTimer > 1 / this.frameRate) {
        this.currentFrame = this.currentFrame + 1;
        this.frameTimer = 0;
      }
    }
  }

  /**
   * @method render
   * @methoddesc Renders the current frame of the animation at the location of the Game Object.
   */
  render(transform) {
    if (this.isActive) {
      image(
        this.gif,
        transform.position.x,
        transform.position.y + this.frameHeight / 2,
        this.frameWidth,
        this.frameHeight,
      );
      console.log();
    }
  }

  play(transform) {
    if (this.currentFrame < this.gif.numFrames()) {
      this.render(transform);
      this.update();
      return true;
    }
    this.currentFrame = 0;
    return false;
  }
}

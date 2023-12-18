class RectangleCollider extends Collider {
  constructor(center, bounds_height, bounds_width) {
    super(center);
    this.bounds_height = bounds_height;
    this.bounds_width = bounds_width;
  }
}

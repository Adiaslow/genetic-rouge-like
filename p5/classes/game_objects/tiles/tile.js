/**
 * @class Tile
 * @classdesc The Tile class. Tiles are GameObjects that have a tile type.
 * @extends {GameObject}
 */
class Tile extends GameObject {
  /**
   * @constructor
   * @param {Collider} collider - The collider of the tile.
   * @param {Renderer} renderer - The renderer of the tile.
   * @param {Transform} transform - The transform of the tile.
   * @param {string} tileType - The type of tile.
   */
  constructor(
    transform,
    tileType,
    tileSprite,
    collider,
    physics,
    renderer,
    shadow,
  ) {
    super(collider, physics, renderer, shadow, transform);
    this.tileType = tileType;
    if (this.tileType === "wall" || this.tileType === "0") {
      this.collider = new RectangleCollider(
        this.transform,
        this.transform.size.x,
        this.transform.size.y,
      );
    } else if (this.tileType === "ground" || this.tileType === "1") {
      this.collider = null;
    } else {
      this.collider = null;
    }
    this.renderer = new SpriteRenderer(
      tileSprite,
      this.transform.size.x,
      this.transform.size.x,
    );
  }
}

/** @abstract */
class Controller {
  /** @abstract */ getDirection() {
    throw new Error('getDirection method must be implemented in derived classes.');
  }
}

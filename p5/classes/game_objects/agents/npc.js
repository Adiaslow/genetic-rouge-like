/**
 * @class NPC
 * @classdesc The generic NPC class. NPCs are Agents that have an NPC AI controller.
 * @extends{Agent}
 */
class NPC extends Agent {
  /**
   * @constructor
   * @param{Collider} collider The collider of the NPC.
   * @param{Physics} physics The physics of the NPC.
   * @param{Renderer} renderer The renderer of the NPC.
   * @param{Transform} transform The transform of the NPC.
   * @param{NPCController} npcController The NPCController of the NPC.
   */
  constructor(collider, physics, renderer, transform, npcController) {
    super(collider, physics, renderer, transform, controller);
    this.controller = npcController || null;
  }
}

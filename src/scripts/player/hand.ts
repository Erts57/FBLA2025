import type { IPlayer } from "./player";
import Hand, { type IHand } from "../entity/hand";
import RenderLayers from "../util/layers";

export default class PlayerHand extends Hand implements IHand {
    constructor(player: IPlayer, handSkin: string) {
        super(player, handSkin);

        this.setDepth(RenderLayers.PLAYER_HAND);
    }

    public override position(angleToMouse: number): void {
        super.position(angleToMouse);
    }
}

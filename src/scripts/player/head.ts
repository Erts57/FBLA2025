import type { IPlayer } from "./player";
import Head, { type IHead } from "../entity/head";
import RenderLayers from "../util/layers";

export default class PlayerHead extends Head implements IHead {
    constructor(player: IPlayer, handSkin: string) {
        super(player, handSkin);

        this.setDepth(RenderLayers.PLAYER_HEAD);
    }

    public override update(): void {
        super.update();
    }
}

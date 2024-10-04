import type { IPlayer } from "./player";
import Body, { type IBody } from "../entity/body";
import RenderLayers from "../util/layers";

export default class PlayerBody extends Body implements IBody {
    constructor(player: IPlayer, handSkin: string) {
        super(player, handSkin);

        this.setDepth(RenderLayers.PLAYER_BODY);
    }

    public override update(): void {
        super.update();
    }
}

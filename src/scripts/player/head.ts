import Phaser from "phaser";
import type DropShadowPostFxPipeline from "phaser3-rex-plugins/plugins/dropshadowpipeline";

import type { IGame } from "../game";
import type { IPlayer } from "./player";
import RenderLayers from "../util/layers";
import { ShadowSettings } from "../client_constants";

export interface IHead extends Phaser.GameObjects.Sprite {
    readonly scene: IGame;
    readonly player: IPlayer;
    headShadowPipelineInstance: DropShadowPostFxPipeline;

    /**
     * Sets the position of the head.
     */
    update(): void;
}

export default class Head extends Phaser.GameObjects.Sprite implements IHead {
    public readonly scene: IGame;
    public readonly player: IPlayer;
    public headShadowPipelineInstance: DropShadowPostFxPipeline;

    constructor(player: IPlayer, handSkin: string) {
        super(player.scene, player.x, player.y, handSkin);
        this.scene = player.scene;

        this.player = player;

        this.scene.add.existing(this);

        this.setDepth(RenderLayers.PLAYER_HEAD);

        this.setOrigin(0.5);
        this.setDisplaySize(64, 64);

        this.scene.physics.world.enable(this);
        (this.body as Phaser.Physics.Arcade.Body).setCircle(64);

        this.headShadowPipelineInstance = this.scene.shadowPipelineInstance!.add(this, ShadowSettings);
    }

    public update(): void {
        this.setPosition(this.player.x, this.player.y - 48);
    }
}

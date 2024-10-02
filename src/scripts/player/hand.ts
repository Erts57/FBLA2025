import Phaser from "phaser";
import type DropShadowPostFxPipeline from "phaser3-rex-plugins/plugins/dropshadowpipeline";

import type { IGame } from "../game";
import type { IPlayer } from "./player";
import RenderLayers from "../util/layers";
import { ShadowSettings } from "../client_constants";

export interface IHand extends Phaser.GameObjects.Sprite {
    readonly scene: IGame;
    readonly player: IPlayer;
    handShadowPipelineInstance: DropShadowPostFxPipeline;

    /**
     * Sets the position and rotation of the hands based on the angle to the mouse.
     * @param angleToMouse The angle between the player and the mouse, in radians.
     */
    position(angleToMouse: number): void;
}

export default class Hand extends Phaser.GameObjects.Sprite implements IHand {
    public readonly scene: IGame;
    public readonly player: IPlayer;
    public handShadowPipelineInstance: DropShadowPostFxPipeline;

    constructor(player: IPlayer, handSkin: string) {
        super(player.scene, player.x, player.y, handSkin);
        this.scene = player.scene;

        this.player = player;

        this.scene.add.existing(this);

        this.setDepth(RenderLayers.PLAYER_HAND);

        this.setOrigin(0.5);
        this.setDisplaySize(32, 32);

        this.scene.physics.world.enable(this);
        (this.body as Phaser.Physics.Arcade.Body).setCircle(64);

        this.handShadowPipelineInstance = this.scene.shadowPipelineInstance!.add(this, ShadowSettings);
    }

    public position(angleToMouse: number): void {
        /**
         * Calculates the position offset of the hand based on the hand angle.
         */
        const handOffset = new Phaser.Math.Vector2(0, 64).rotate(angleToMouse - Math.PI / 2);

        // Set the position of the left and right hands
        this.setPosition(this.player.x + handOffset.x, this.player.y + handOffset.y);

        this.setFlipY(angleToMouse > Math.PI / 2 || angleToMouse < -Math.PI / 2);

        this.setRotation(angleToMouse);
    }
}

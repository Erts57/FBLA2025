import Phaser from "phaser";
import type DropShadowPostFxPipeline from "phaser3-rex-plugins/plugins/dropshadowpipeline";

import type { IGame } from "../game";
import type { IEntity } from "./entity";
import { ShadowSettings } from "../client_constants";

export interface IHand extends Phaser.GameObjects.Sprite {
    readonly scene: IGame;
    readonly entity: IEntity;
    handShadowPipelineInstance: DropShadowPostFxPipeline;

    /**
     * Sets the position and rotation of the hands based on the angle.
     * @param angle The angle in radians.
     */
    position(angle: number): void;
}

export default class Hand extends Phaser.GameObjects.Sprite implements IHand {
    public readonly scene: IGame;
    public readonly entity: IEntity;
    public handShadowPipelineInstance: DropShadowPostFxPipeline;

    constructor(entity: IEntity, handSkin: string) {
        super(entity.scene, entity.x, entity.y, handSkin);
        this.scene = entity.scene;

        this.entity = entity;

        this.scene.add.existing(this);

        this.setOrigin(0.5);
        this.setDisplaySize(32, 32);

        this.scene.physics.world.enable(this);
        (this.body as Phaser.Physics.Arcade.Body).setCircle(64);

        this.handShadowPipelineInstance = this.scene.shadowPipelineInstance!.add(this, ShadowSettings);
    }

    public position(angle: number): void {
        /**
         * Calculates the position offset of the hand based on the hand angle.
         */
        const handOffset = new Phaser.Math.Vector2(0, 64).rotate(angle - Math.PI / 2);

        // Set the position of the left and right hands
        this.setPosition(this.entity.x + handOffset.x, this.entity.y + handOffset.y);

        this.setFlipY(angle > Math.PI / 2 || angle < -Math.PI / 2);

        this.setRotation(angle);
    }
}

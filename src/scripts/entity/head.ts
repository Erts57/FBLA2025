import Phaser from "phaser";
import type DropShadowPostFxPipeline from "phaser3-rex-plugins/plugins/dropshadowpipeline";

import type { IGame } from "../game";
import type { IEntity } from "./entity";
import { ShadowSettings } from "../client_constants";

export interface IHead extends Phaser.GameObjects.Sprite {
    readonly scene: IGame;
    readonly entity: IEntity;
    headShadowPipelineInstance: DropShadowPostFxPipeline;

    /**
     * Sets the position of the head.
     */
    update(): void;
}

export default class Head extends Phaser.GameObjects.Sprite implements IHead {
    public readonly scene: IGame;
    public readonly entity: IEntity;
    public headShadowPipelineInstance: DropShadowPostFxPipeline;

    constructor(entity: IEntity, handSkin: string) {
        super(entity.scene, entity.x, entity.y, handSkin);
        this.scene = entity.scene;

        this.entity = entity;

        this.scene.add.existing(this);

        this.setOrigin(0.5);
        this.setDisplaySize(64, 64);

        this.scene.physics.world.enable(this);
        (this.body as Phaser.Physics.Arcade.Body).setCircle(64);

        this.headShadowPipelineInstance = this.scene.shadowPipelineInstance!.add(this, ShadowSettings);
    }

    public update(): void {
        this.setPosition(this.entity.x, this.entity.y - 48);
    }
}

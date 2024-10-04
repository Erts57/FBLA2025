import Phaser from "phaser";
import type DropShadowPostFxPipeline from "phaser3-rex-plugins/plugins/dropshadowpipeline";

import type { IGame } from "../game";
import type { IEntity } from "./entity";
import RenderLayers from "../util/layers";
import { ShadowSettings } from "../client_constants";

export interface IBody extends Phaser.GameObjects.Sprite {
    readonly scene: IGame;
    readonly entity: IEntity;
    bodyShadowPipelineInstance: DropShadowPostFxPipeline;

    /**
     * Sets the position of the body.
     */
    update(): void;
}

export default class Body extends Phaser.GameObjects.Sprite implements IBody {
    public readonly scene: IGame;
    public readonly entity: IEntity;
    public bodyShadowPipelineInstance: DropShadowPostFxPipeline;

    constructor(entity: IEntity, handSkin: string) {
        super(entity.scene, entity.x, entity.y, handSkin);
        this.scene = entity.scene;

        this.entity = entity;

        this.scene.add.existing(this);

        this.setOrigin(0.5);
        this.setDisplaySize(64, 64);

        this.bodyShadowPipelineInstance = this.scene.shadowPipelineInstance!.add(this, ShadowSettings);
    }

    public update(): void {
        this.setPosition(this.entity.x, this.entity.y);
    }
}

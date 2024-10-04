import Phaser from "phaser";
import _ from "lodash";
import type DropShadowPostFxPipeline from "phaser3-rex-plugins/plugins/dropshadowpipeline";

import type { IGame } from "../game";
import Body, { type IBody } from "./body";
import Hand, { type IHand } from "./hand";
import Head, { type IHead } from "./head";
import gameState from "../game_state";
import { getImage } from "../util/util";
import { ShadowSettings } from "../client_constants";

export interface IEntity extends Phaser.Physics.Arcade.Sprite {
    readonly scene: IGame;

    dead: boolean;
    mainBody: IBody;
    head: IHead;
    hand: IHand;
    entityShadowPipelineInstance: DropShadowPostFxPipeline;
    speed: number;
    canAttack: boolean;

    /**
     * Handles the movement for the entity.
     * @param speed The calculated travel speed for the entity.
     */
    handleMovement(speed: number): void;
}

export default class Entity extends Phaser.Physics.Arcade.Sprite implements IEntity {
    public readonly scene: IGame;
    public dead: boolean = false;
    public mainBody: IBody;
    public head: IHead;
    public hand: IHand;
    public entityShadowPipelineInstance: DropShadowPostFxPipeline;
    public speed: number;
    public canAttack: boolean = true;

    constructor(
        scene: IGame,
        x: number,
        y: number,
        { body, head, hand }: { body: string; head: string; hand: string }
    ) {
        super(scene, x, y, "blank");
        this.scene = scene;

        this.mainBody = new Body(this, getImage(body));
        this.head = new Head(this, getImage(head));
        this.hand = new Hand(this, getImage(hand));

        this.scene.add.existing(this);

        this.entityShadowPipelineInstance = this.scene.shadowPipelineInstance!.add(this, ShadowSettings);

        this.speed = 50;

        this.setOrigin(0.5);

        this.scene.physics.world.enableBody(this);
        this.setCollideWorldBounds(false);
        (this.body as Phaser.Physics.Arcade.Body).setSize(64, 96);
        (this.body as Phaser.Physics.Arcade.Body).setOffset(-16, -48);
        (this.body as Phaser.Physics.Arcade.Body).setDrag(1000);
        (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(512);
    }

    protected preUpdate(time: number, delta: number): void {
        if (this.dead) return;

        this.handleMovement(this.speed * delta);

        this.mainBody.update();
        this.head.update();
        this.hand.position(0);
    }

    public handleMovement(speed: number): void {
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > gameState.level.map.widthInPixels) {
            this.x = gameState.level.map.widthInPixels;
        }

        if (this.y < 0) {
            this.y = 0;
        } else if (this.y > gameState.level.map.heightInPixels) {
            this.y = gameState.level.map.heightInPixels;
        }
    }
}

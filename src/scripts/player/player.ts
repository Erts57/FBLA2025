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

export interface IPlayer extends Phaser.Physics.Arcade.Sprite {
    readonly scene: IGame;

    dead: boolean;
    readonly mainBody: IBody;
    readonly head: IHead;
    readonly hand: IHand;
    readonly buildOverlay: any; // TODO
    playerShadowPipelineInstance: DropShadowPostFxPipeline;
    speed: number;
    canAttack: boolean;
    building: boolean;
    canBuild: boolean;
    doneBuilding: boolean;

    /**
     * Handles the movement for the player.
     * @param speed The calculated travel speed for the player.
     */
    handleMovement(speed: number): void;
}

export default class Player extends Phaser.Physics.Arcade.Sprite implements IPlayer {
    public readonly scene: IGame;
    public dead: boolean = false;
    public readonly mainBody: IBody;
    public readonly head: IHead;
    public readonly hand: IHand;
    public readonly buildOverlay: any; // TODO
    public playerShadowPipelineInstance: DropShadowPostFxPipeline;
    public speed: number;
    public canAttack: boolean = true;
    public building: boolean = false;
    public canBuild: boolean = true;
    public doneBuilding: boolean = true;

    constructor(scene: IGame, x: number, y: number) {
        super(scene, x, y, "");
        this.scene = scene;

        this.mainBody = new Body(this, getImage("player.body"));
        this.head = new Head(this, getImage("player.head"));
        this.hand = new Hand(this, getImage("player.hand"));
        this.buildOverlay; // TODO

        this.scene.add.existing(this);

        this.playerShadowPipelineInstance = this.scene.shadowPipelineInstance!.add(this, ShadowSettings);

        this.speed = 20;

        this.setOrigin(0.5);

        this.scene.physics.world.enableBody(this);
        this.setCollideWorldBounds(false);
        (this.body as Phaser.Physics.Arcade.Body).setSize(64, 96);
        (this.body as Phaser.Physics.Arcade.Body).setOffset(-16, -48);
        (this.body as Phaser.Physics.Arcade.Body).setDrag(1000);
        (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(512);

        this.scene.playerGroup!.add(this);
    }

    protected preUpdate(time: number, delta: number): void {
        if (this.dead) return;

        this.scene.mouse!.updateWorldPoint(this.scene.mainCamera!);

        /**
         * Calculates the angle between the player and the mouse pointer
         * in radians.
         */
        const angleToMouse = Phaser.Math.Angle.Between(
            this.x,
            this.y,
            this.scene.mouse!.worldX,
            this.scene.mouse!.worldY
        );

        this.building = false;

        this.handleMovement(this.speed);

        const speed = this.speed * 128 * delta;
        console.log(delta, speed, this.speed);
        this.handleMovement(speed);

        this.mainBody.update();
        this.head.update();
        this.hand.position(angleToMouse);
    }

    public handleMovement(speed: number): void {
        if (!this.scene.controls) return;

        // Determine if the player is moving left or right.
        const left = _.toNumber(this.scene.controls.A.isDown || this.scene.controls.LEFT.isDown);
        const right = _.toNumber(this.scene.controls.D.isDown || this.scene.controls.RIGHT.isDown);

        // Determine if the player is moving up or down.
        const up = _.toNumber(this.scene.controls.W.isDown || this.scene.controls.UP.isDown);
        const down = _.toNumber(this.scene.controls.S.isDown || this.scene.controls.DOWN.isDown);

        // Calculate the horizontal and vertical movement based on the player's input.
        const horizontalAxis = right - left;
        const verticalAxis = down - up;

        // Calculate the magnitude of the movement vector.
        const magnitude = Math.sqrt(horizontalAxis ** 2 + verticalAxis ** 2);

        // Calculate the normalized direction vector.
        const directionX = horizontalAxis / magnitude;
        const directionY = verticalAxis / magnitude;

        // Calculate the player's velocity based on direction and speed.
        const velocityX = Math.round(directionX * speed);
        const velocityY = directionY * speed;

        // Set the player's velocity.
        this.setVelocity(Number.isNaN(velocityX) ? 0 : velocityX, Number.isNaN(velocityY) ? 0 : velocityY);

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

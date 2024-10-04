import Phaser from "phaser";
import _ from "lodash";

import type { IGame } from "../game";
import Entity, { type IEntity } from "../entity/entity";
import PlayerBody from "./body";
import PlayerHead from "./head";
import PlayerHand from "./hand";
import { getImage } from "../util/util";

export interface IPlayer extends IEntity {
    readonly buildOverlay: any; // TODO
    building: boolean;
    canBuild: boolean;
    doneBuilding: boolean;

    /**
     * Handles the movement for the player.
     * @param speed The calculated travel speed for the player.
     */
    handleMovement(speed: number): void;
}

export default class Player extends Entity implements IPlayer {
    public buildOverlay: any; // TODO
    public building: boolean = false;
    public canBuild: boolean = true;
    public doneBuilding: boolean = true;

    constructor(scene: IGame, x: number, y: number) {
        super(scene, x, y, { body: "player.body", head: "player.head", hand: "player.hand" });

        this.mainBody.destroy();
        this.head.destroy();
        this.hand.destroy();

        this.mainBody = new PlayerBody(this, getImage("player.body"));
        this.head = new PlayerHead(this, getImage("player.head"));
        this.hand = new PlayerHand(this, getImage("player.hand"));
        this.buildOverlay; // TODO

        this.speed = 50;

        this.scene.playerGroup!.add(this);
    }

    protected override preUpdate(time: number, delta: number): void {
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

        super.preUpdate(time, delta);
        this.hand.position(angleToMouse);
    }

    public override handleMovement(speed: number): void {
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

        super.handleMovement(speed);
    }
}

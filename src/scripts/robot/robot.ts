import _ from "lodash";

import type { IGame } from "../game";
import Entity, { type IEntity } from "../entity/entity";
import RobotBody from "./body";
import RobotHead from "./head";
import RobotHand from "./hand";
import { getImage } from "../util/util";

export interface IRobot extends IEntity {
    readonly buildOverlay: any; // TODO
    building: boolean;
    canBuild: boolean;
    doneBuilding: boolean;

    /**
     * Handles the movement for the robot.
     * @param speed The calculated travel speed for the robot.
     */
    handleMovement(speed: number): void;
}

export default class Robot extends Entity implements IRobot {
    public buildOverlay: any; // TODO
    public building: boolean = false;
    public canBuild: boolean = true;
    public doneBuilding: boolean = true;

    constructor(scene: IGame, x: number, y: number) {
        super(scene, x, y, { body: "robot.body", head: "robot.head", hand: "robot.hand" });

        this.mainBody.destroy();
        this.head.destroy();
        this.hand.destroy();

        this.mainBody = new RobotBody(this, getImage("robot.body"));
        this.head = new RobotHead(this, getImage("robot.head"));
        this.hand = new RobotHand(this, getImage("robot.hand"));
        this.buildOverlay; // TODO

        this.speed = 50;

        this.scene.robotsGroup!.add(this);
    }

    protected override preUpdate(time: number, delta: number): void {
        if (this.dead) return;

        this.building = false;

        super.preUpdate(time, delta);
        this.hand.position(270);
    }

    public override handleMovement(speed: number): void {
        if (!this.scene.controls) return;

        // Determine if the robot is moving left or right.
        const left = _.random(-1, 1); //_.toNumber(this.scene.controls.A.isDown || this.scene.controls.LEFT.isDown);
        const right = _.random(-1, 1); //_.toNumber(this.scene.controls.D.isDown || this.scene.controls.RIGHT.isDown);

        // Determine if the robot is moving up or down.
        const up = _.random(-1, 1); //_.toNumber(this.scene.controls.W.isDown || this.scene.controls.UP.isDown);
        const down = _.random(-1, 1); //_.toNumber(this.scene.controls.S.isDown || this.scene.controls.DOWN.isDown);

        // Calculate the horizontal and vertical movement based on the robot's input.
        const horizontalAxis = right - left;
        const verticalAxis = down - up;

        // Calculate the magnitude of the movement vector.
        const magnitude = Math.sqrt(horizontalAxis ** 2 + verticalAxis ** 2);

        // Calculate the normalized direction vector.
        const directionX = horizontalAxis / magnitude;
        const directionY = verticalAxis / magnitude;

        // Calculate the robot's velocity based on direction and speed.
        const velocityX = Math.round(directionX * speed);
        const velocityY = directionY * speed;

        // Set the robot's velocity.
        this.setVelocity(Number.isNaN(velocityX) ? 0 : velocityX, Number.isNaN(velocityY) ? 0 : velocityY);

        super.handleMovement(speed);
    }
}

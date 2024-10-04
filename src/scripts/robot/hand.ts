import type { IRobot } from "./robot";
import Hand, { type IHand } from "../entity/hand";
import RenderLayers from "../util/layers";

export default class RobotHand extends Hand implements IHand {
    constructor(robot: IRobot, handSkin: string) {
        super(robot, handSkin);

        this.setDepth(RenderLayers.ROBOT_HAND);
    }

    public override position(angleToMouse: number): void {
        super.position(angleToMouse);
    }
}

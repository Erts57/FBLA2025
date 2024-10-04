import type { IRobot } from "./robot";
import Head, { type IHead } from "../entity/head";
import RenderLayers from "../util/layers";

export default class RobotHead extends Head implements IHead {
    constructor(robot: IRobot, handSkin: string) {
        super(robot, handSkin);

        this.setDepth(RenderLayers.ROBOT_HEAD);
    }

    public override update(): void {
        super.update();
    }
}

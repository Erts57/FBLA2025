import type { IRobot } from "./robot";
import Body, { type IBody } from "../entity/body";
import RenderLayers from "../util/layers";

export default class RobotBody extends Body implements IBody {
    constructor(robot: IRobot, handSkin: string) {
        super(robot, handSkin);

        this.setDepth(RenderLayers.ROBOT_BODY);
    }

    public override update(): void {
        super.update();
    }
}

import { WEBGL, Scale } from "phaser";
import DropShadowPipelinePlugin from "phaser3-rex-plugins/plugins/dropshadowpipeline-plugin";

import { Width, Height } from "./client_constants";

import Game from "./game";

const PHASER_CONFIG: Phaser.Types.Core.GameConfig = {
    parent: "stage",
    backgroundColor: 0x6660bf,
    type: WEBGL,

    width: Width,
    height: Height,

    scale: { mode: Scale.ScaleModes.ENVELOP },
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,

    disableContextMenu: true,
    expandParent: true,
    dom: { createContainer: false },

    pixelArt: false,

    physics: {
        default: "arcade",
        arcade: {
            debug:
                process.env.BLOOPS_CLIENT_DEBUG_MODE === "false"
                    ? false
                    : Boolean(process.env.BLOOPS_CLIENT_DEBUG_MODE),
            gravity: { x: 0, y: 0 }
        }
    },

    scene: [Game],

    plugins: {
        global: [
            {
                key: "rexDropShadowPipeline",
                plugin: DropShadowPipelinePlugin,
                start: true
            }
        ]
    }
};

export default PHASER_CONFIG;

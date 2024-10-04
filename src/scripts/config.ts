import { WEBGL, Scale } from "phaser";
import DropShadowPipelinePlugin from "phaser3-rex-plugins/plugins/dropshadowpipeline-plugin";

import { Width, Height } from "./client_constants";

import Game from "./game";

const PHASER_CONFIG: Phaser.Types.Core.GameConfig = {
    parent: "stage",
    backgroundColor: 0x77dcac,
    type: WEBGL,

    width: Width,
    height: Height,

    scale: { mode: Scale.ScaleModes.ENVELOP },
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,

    disableContextMenu: true,
    expandParent: true,
    dom: { createContainer: false },

    fps: { min: 120, smoothStep: true },

    pixelArt: false,

    physics: {
        default: "arcade",
        arcade: {
            debug: true,
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

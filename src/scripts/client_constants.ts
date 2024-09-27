import type Phaser from "phaser";
import type DropShadowPipelinePlugin from "phaser3-rex-plugins/plugins/dropshadowpipeline-plugin";

// Client Constants

export const Width = 1920 as const;
export const Height = 1080 as const;

export const FontFamily = '"Arial Rounded MT", Arial, sans-serif';

export const DefaultText: Phaser.Types.GameObjects.Text.TextStyle = {
    fontStyle: "900",
    fontSize: 30,
    fontFamily: FontFamily,
    color: "#ffffff",
    maxLines: 1
} as const;

export const ShadowSettings: DropShadowPipelinePlugin.IConfig = {
    angle: 270,
    distance: 5,
    shadowColor: 0x000000,
    alpha: 0.75,
    shadowOnly: false,
    blur: 1,
    quality: 1
} as const;

import Phaser from "phaser";
import _ from "lodash";
import type DropShadowPipelinePlugin from "phaser3-rex-plugins/plugins/dropshadowpipeline-plugin";

import Preload from "./util/preload";
import RenderLayers from "./util/layers";
import gameState from "./game_state";
import dom from "./dom";
import Player from "./player/player";
import { getImage, assignImage } from "./util/util";
import { Height, Width } from "./client_constants";

type ScreenObject = Phaser.GameObjects.GameObject | Phaser.Tweens.Tween | Phaser.Tilemaps.Tilemap;

enum Screen {
    MAIN_MENU,
    GAME,
    DEATH
}

interface LevelGroups {
    buildings: Phaser.GameObjects.Group;
}

interface ScreenObjects {
    mainMenu: ScreenObject[];
    death: ScreenObject[];
}

export interface IGame extends Phaser.Scene {
    /**
     * The current screen that is displayed.
     */
    screen: Screen;

    /**
     * The window's width resolution.
     */
    width: number;

    /**
     * The windows's height resolution.
     */
    height: number;

    /**
     * Half of the window's width resolution.
     */
    halfWidth: number;

    /**
     * Half of the windows's height resolution.
     */
    halfHeight: number;

    /**
     * The mouse pointer.
     */
    mouse?: Phaser.Input.Pointer;

    /**
     * Whether the mouse pointer is currently over the in-game UI.
     */
    mouseOverUI: boolean;

    /**
     * The controls for the game.
     */
    controls: Controls | null;

    /**
     * The main camera.
     */
    mainCamera?: Phaser.Cameras.Scene2D.Camera;

    /**
     * The UI group.
     */
    UIGroup?: Phaser.GameObjects.Group;

    /**
     * The player group.
     */
    playerGroup?: Phaser.GameObjects.Group;

    /**
     * The robots group.
     */
    robotsGroup?: Phaser.GameObjects.Group;

    /**
     * The level groups.
     */
    levelGroups?: LevelGroups;

    /**
     * For adding drop shadows to sprites.
     */
    shadowPipelineInstance?: DropShadowPipelinePlugin;

    /**
     * The screen objects.
     */
    screenObjects: ScreenObjects;

    /**
     * Preload assets for this scene.
     * Called when the scene starts.
     */
    preload(): void;

    /**
     * Create the main menu objects for this scene.
     * This is where you create sprites, groups, UI, etc.
     * Called after `preload`.
     */
    create(): void;

    /**
     * Better management for switching screens.
     */
    setScreen(screen: Screen): void;

    /**
     * Creates the main player object.
     */
    createPlayer(): void;

    /**
     * This function is called every frame.
     * @param time The current time.
     * @param delta The time since the last frame.
     */
    update(time: number, delta: number): void;

    /**
     * Destroys the specified screen.
     * @param screen The screen to destroy.
     */
    destroy(screen: Screen): void;
}

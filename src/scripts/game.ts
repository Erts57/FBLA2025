import Phaser from "phaser";
import _ from "lodash";
import type DropShadowPipelinePlugin from "phaser3-rex-plugins/plugins/dropshadowpipeline-plugin";

import Preload from "./util/preload";
import RenderLayers from "./util/layers";
import gameState from "./game_state";
import dom from "./dom";
import Player from "./player/player";
import Level from "./level/level";
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
    preload(): Promise<Phaser.Loader.LoaderPlugin[]>;

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

export default class Game extends Phaser.Scene implements IGame {
    public screen: Screen = Screen.MAIN_MENU;
    public width = Width;
    public height = Height;
    public halfWidth = Width / 2;
    public halfHeight = Height / 2;
    public mouse?: Phaser.Input.Pointer;
    public mouseOverUI = false;
    public controls: Controls | null = null;
    public mainCamera?: Phaser.Cameras.Scene2D.Camera;
    public UIGroup?: Phaser.GameObjects.Group;
    public playerGroup?: Phaser.GameObjects.Group;
    public robotsGroup?: Phaser.GameObjects.Group;
    public levelGroups?: LevelGroups;
    public shadowPipelineInstance?: DropShadowPipelinePlugin;
    public screenObjects: ScreenObjects = {
        mainMenu: [],
        death: []
    };

    constructor() {
        super({ key: "Game" });
    }

    public async preload(): Promise<Phaser.Loader.LoaderPlugin[]> {
        this.mouse = this.input.mousePointer;

        this.controls = this.input.keyboard!.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            UP: Phaser.Input.Keyboard.KeyCodes.UP,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            DOWN: Phaser.Input.Keyboard.KeyCodes.DOWN,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,
            D: Phaser.Input.Keyboard.KeyCodes.D,
            RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            E: Phaser.Input.Keyboard.KeyCodes.E,
            ESC: Phaser.Input.Keyboard.KeyCodes.ESC
        }) as Controls;

        this.mainCamera = this.cameras.main;

        this.UIGroup = this.add.group();
        this.playerGroup = this.add.group();
        this.robotsGroup = this.add.group();
        this.levelGroups = {
            buildings: this.add.group()
        };

        this.shadowPipelineInstance = this.plugins.get("rexDropShadowPipeline") as DropShadowPipelinePlugin;

        return new Preload(this).load([], []);
    }

    public create(): void {
        this.setScreen(Screen.GAME);
    }

    public setScreen(screen: Screen): void {
        this.destroy(this.screen);
        this.screen = screen;
        switch (screen) {
            case Screen.MAIN_MENU:
                this.createMainMenu();
                break;

            case Screen.GAME:
                this.createGameScreen();
                break;

            case Screen.DEATH:
                this.createDeathScreen();
                break;
        }
    }

    private createMainMenu(): void {}

    private createGameScreen(): void {
        gameState.level = new Level(this, 100, 100);
        gameState.level.importMap(gameState.level.returnSolidMap(100, 100, 0));
        this.createPlayer();
    }

    private createDeathScreen(): void {}

    public createPlayer(): void {
        gameState.player = new Player(this, this.halfWidth, this.halfHeight);

        // Start the main camera following the player
        this.mainCamera!.startFollow(gameState.player.mainBody, true, 0.1, 0.1);

        this.mainCamera!.setBounds(
            0,
            0,
            gameState.level.map.widthInPixels,
            gameState.level.map.heightInPixels
        );
    }

    public update(time: number, delta: number): void {}

    public destroy(screen: Screen): void {}
}

import Phaser from "phaser";
import _ from "lodash";

import type { IGame } from "../game";
import LevelLayer, { type ILevelLayer } from "./level_layer";
//import Building, { type IBuilding } from "../building";
import { getImage } from "../util/util";

export interface ILevel {
    readonly scene: IGame;
    readonly map: Phaser.Tilemaps.Tilemap;
    levelLayer: ILevelLayer;
    buildings: any[];
    importMap(mapData: number[][][]): void;
    exportMap(): number[][][];
    addBuilding(buildingData: any): void;
    returnSolidMap(width: number, height: number, index: number): number[][][];
}

export default class Level implements ILevel {
    public readonly scene: IGame;
    public readonly map: Phaser.Tilemaps.Tilemap;
    public levelLayer: ILevelLayer;
    public buildings: any[];

    constructor(scene: IGame, width?: number, height?: number, mapData?: number[][][]) {
        this.scene = scene;

        this.map = this.scene.make.tilemap({
            width: _.clamp(_.toNumber(width), 20, 1000),
            height: _.clamp(_.toNumber(height), 20, 1000),
            tileWidth: 128,
            tileHeight: 128
        });

        // The tileset image for this level's map.
        this.map.addTilesetImage(getImage("level._tileset"));

        this.levelLayer = new LevelLayer(this.map, "level_layer");

        this.buildings = [];

        // If mapData is provided, import it into the level.
        if (mapData) {
            this.importMap(mapData);
        }
    }

    public importMap(mapData: number[][][]): void {
        // Set the map dimensions in case `mapData` is a different size
        this.map.width = _.clamp(mapData[0].length, 20, 1000);
        this.map.height = _.clamp(mapData.length, 20, 1000);

        // Remove all existing layers
        this.map.removeAllLayers();

        this.levelLayer = new LevelLayer(this.map, "level_layer");

        // Loop through each row and column of the mapData array
        for (let y = 0; y < mapData.length; y++) {
            const row = mapData[y];
            for (let x = 0; x < row.length; x++) {
                const [tile] = row[x];

                // Set the tiles at the current x,y coordinates
                this.levelLayer.setTileAt(tile, x, y);
            }
        }
    }

    public exportMap(): number[][][] {
        return [[]];
    }

    public addBuilding(buildingData: any): void {}

    public returnSolidMap(width: number, height: number, index: number): number[][][] {
        // Create an array with a length equal to the height parameter.
        // Each element is generated using a function that creates an array with a length equal to the width parameter.
        // Each element in that array is an array containing two values, both set to the index parameter.
        return Array.from({ length: height }, () => Array.from({ length: width }, () => [index]));
    }
}

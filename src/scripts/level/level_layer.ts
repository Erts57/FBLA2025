import Phaser from "phaser";

import { type IGame } from "../game";

export interface ILevelLayer {
    readonly scene: IGame;
    layer: Phaser.Tilemaps.TilemapLayer;
    getTileData(): Phaser.Tilemaps.Tile[][];
    setTileAt(tileIndex: number, x: number, y: number): void;
    removeTileAt(x: number, y: number): void;
}

export default class LevelLayer implements ILevelLayer {
    public readonly scene: IGame;
    public layer: Phaser.Tilemaps.TilemapLayer;

    constructor(tilemap: Phaser.Tilemaps.Tilemap, layerName: string) {
        this.scene = tilemap.scene as IGame;

        this.layer = tilemap.createBlankLayer(
            layerName,
            tilemap.tilesets,
            0,
            0,
            tilemap.width,
            tilemap.height,
            128,
            128
        ) as Phaser.Tilemaps.TilemapLayer;
    }

    public getTileData(): Phaser.Tilemaps.Tile[][] {
        return this.layer.layer.data;
    }

    public setTileAt(tileIndex: number, x: number, y: number): void {
        if (tileIndex < 0) return;
        this.layer.putTileAt(tileIndex, x, y);
    }

    public removeTileAt(x: number, y: number): void {
        this.layer.removeTileAt(x, y);
    }
}

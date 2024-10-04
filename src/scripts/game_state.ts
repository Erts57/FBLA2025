import type { IPlayer } from "./player/player";
import type { ILevel } from "./level/level";

interface GameState {
    player: IPlayer | null;
    level: ILevel;
}

/**
 * Stored game state values to be used throughout the game.
 * They cannot be changed by mods or directly by the server.
 */
const gameState: GameState = {
    player: null,
    level: null as unknown as ILevel
};

export default gameState;

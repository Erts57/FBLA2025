import type { IPlayer } from "./player/player";

interface GameState {
    player: IPlayer | null;
    level: any; // TODO
}

/**
 * Stored game state values to be used throughout the game.
 * They cannot be changed by mods or directly by the server.
 */
const gameState: GameState = {
    player: null,
    level: null
};

export default gameState;

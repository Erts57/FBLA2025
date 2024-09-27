//import type { IPlayer } from "./player/player";

interface GameState {
    clientPlayer: any | null;
    level: any; // TODO
}

/**
 * Stored game state values to be used throughout the game.
 * They cannot be changed by mods or directly by the server.
 */
const gameState: GameState = {
    clientPlayer: null,
    level: null
};

export default gameState;

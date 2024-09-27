interface DOM {
    domContainer: HTMLDivElement;
}

/**
 * Stored DOM elements to be used throughout the game.
 */
const dom: DOM = {
    domContainer: document.getElementById("dom") as HTMLDivElement
};

export default dom;

const layerItems = [
    // Renders last (top)
    ["MAIN_MENU_UI"],
    ["HOTBAR_AMOUNT", "LEADERBOARD_TEXT", "BUILD_OVERLAY_TEXT"],
    ["HOTBAR_ITEM", "GAGE", "CRAFTING_ITEM", "LEADERBOARD"],
    ["HOTBAR_SLOT", "GAGE_BAR", "CRAFTING_SLOT"],
    ["TREE"],
    ["LARGE_RESOURCE"],
    ["PLAYER_USERNAME"],
    ["SOLID_BUILDING_HEALTH"],
    ["SOLID_BUILDING"],
    ["PLAYER_HEAD"],
    ["PLAYER_HAND"],
    ["PLAYER_ITEM"],
    ["PLAYER_BODY"],
    ["USERNAME"],
    ["BUILD_OVERLAY"],
    ["ROBOT_HAT"],
    ["ROBOT_ACCESSORY"],
    ["ROBOT"],
    ["ROBOT_HAND"],
    ["ROBOT_ITEM"],
    ["BUILDING_HEALTH"],
    ["BUILDING"],
    ["DECORATION"],
    ["LEVEL"]
    // Renders first (bottom)
] as const;

/**
 * A dictionary object that maps renderable items to their corresponding render layer.
 */
export type RenderLayers = {
    [key in (typeof layerItems)[number][number]]: number;
};

const RenderLayers = {} as RenderLayers;

for (let i = layerItems.length - 1; i >= 0; i--) {
    for (let j = 0; j < layerItems[i].length; j++) {
        RenderLayers[layerItems[i][j]] = layerItems.length - 1 - i;
    }
}

export default RenderLayers;

const layerItems = [
    // Renders last (top)
    ["MAIN_MENU_UI"],
    ["HOTBAR_AMOUNT", "LEADERBOARD_TEXT", "BUILD_OVERLAY_TEXT"],
    ["HOTBAR_ITEM", "GAGE", "CRAFTING_ITEM", "LEADERBOARD"],
    ["HOTBAR_SLOT", "GAGE_BAR", "CRAFTING_SLOT"],
    ["CLOUD"],
    ["CHAT_MESSAGE"],
    ["CHAT_MESSAGE_BUBBLE"],
    ["PALM_TREE"],
    ["TREE"],
    ["LARGE_RESOURCE"],
    ["MEDIUM_RESOURCE"],
    ["SMALL_RESOURCE"],
    ["CLIENT_USERNAME"],
    ["SOLID_BUILDING_HEALTH"],
    ["SOLID_BUILDING"],
    ["CLIENT_HAT"],
    ["CLIENT_ACCESORY"],
    ["CLIENT_EYES"],
    ["CLIENT"],
    ["CLIENT_BACKPACK"],
    ["CLIENT_HAND"],
    ["CLIENT_ITEM"],
    ["USERNAME"],
    ["BUILD_OVERLAY"],
    ["CLIENT_MOUNT"],
    ["PLAYER_HAT"],
    ["PLAYER_ACCESSORY"],
    ["PLAYER_EYES"],
    ["PLAYER"],
    ["PLAYER_BACKPACK"],
    ["PLAYER_HAND"],
    ["PLAYER_ITEM"],
    ["PLAYER_MOUNT"],
    ["BUILDING_HEALTH"],
    ["BUILDING"],
    ["RED_TILE"],
    ["DECORATION"],
    ["LIQUID"],
    ["ISLAND"],
    ["TEAM_TILE"],
    ["BIOME"],
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

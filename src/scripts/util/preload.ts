import type Phaser from "phaser";
import _ from "lodash";

export default class Preload {
    /**
     * A map of all images and atlases to be preloaded, where the key is the name
     * of the image or atlas and the value is either a string containing the
     * path to the image or a JSON file, or an object with the following
     * properties:
     * - `src`: path to the image
     * - `json`: path to the JSON file
     *
     * For example:
     *
     * { "image": "path/to/image.png", "atlas": { "src": "path/to/atlas.png", "json": "path/to/atlas.json" } }
     */
    private imagesToLoad: { [key: string]: string | { [key: string]: object | string } } = {};

    /**
     * The Phaser scene to preload images and atlases for.
     */
    public scene: Phaser.Scene;

    /**
     * Creates a new Preload instance.
     * @param scene The Phaser scene to preload images and atlases for.
     */
    constructor(scene: Phaser.Scene) {
        // Import the images using require.context
        const Images = require.context("../../assets/", true, /\.(png|jpe?g|svg|json)$/);
        const obj: { [key: string]: { [key: string]: object | string } | string } = {};

        _.forEach(Images.keys(), (key) => {
            const folderMatch = key.match(/(.*)\/[^/]*$/);
            const folder = folderMatch ? folderMatch[1] : "";
            const folderName = folder.split("/").pop() || "";
            const fileNameMatch = key.match(/([^/]+)$/);
            const fileName = fileNameMatch ? fileNameMatch[1] : "";
            const fileExtension = fileName.split(".").pop();

            if (folderName === ".") {
                obj[
                    fileName.replace(`.${fileExtension}`, "").replace(/_/g, "")
                ] = require(`../../assets/${fileName}`);
            } else if (fileExtension === "json") {
                _.set(
                    obj,
                    `${folderName}._${fileName.replace(`.${fileExtension}`, "").replace(/_/g, "")}.atlas`,
                    {
                        // The src property is the path to the SVG file
                        src: require(`../../assets/${folderName}/${fileName
                            .replace("_", "")
                            .replace("json", "svg")}`),
                        // The json property is the path to the JSON file
                        json: require(`../../assets/${folderName}/${fileName}`)
                    }
                );
            } else {
                // If the folder name is not already a key in the obj map, add it with an empty object as its value
                let temp: { [key: string]: object | string } | string = obj[folderName];
                if (typeof temp !== "string") {
                    if (temp === undefined) temp = {};
                    // Add the file name and path to the temp object
                    temp[
                        fileName.replace(`.${fileExtension}`, "").replace(/_/g, "")
                    ] = require(`../../assets/${folderName}/${fileName}`);
                    // Update the obj map with the new temp object
                    obj[folderName] = temp;
                }
            }
        });

        this.imagesToLoad = obj;

        this.scene = scene;
    }

    /**
     * Preloads images and atlases for the scene.
     * @param ignoredObjects An array of object names to ignore when preloading.
     * @param ignoredTextures An array of texture names to ignore when preloading.
     * @returns A promise that resolves when all images are loaded.
     */
    public async load(
        ignoredObjects: string[] = [],
        ignoredTextures: string[] = []
    ): Promise<Phaser.Loader.LoaderPlugin[]> {
        try {
            const promises: Phaser.Loader.LoaderPlugin[] = [];

            // Filter images to load based on `ignoredObjects` and `ignoredTextures`
            const imagesToLoad = _.filter(_.entries(this.imagesToLoad), ([key, value]) => {
                if (
                    (ignoredObjects && ignoredObjects.includes(key) && typeof value === "object") ||
                    (ignoredTextures && ignoredTextures.includes(key) && typeof value === "string")
                ) {
                    return false;
                }
                return true;
            });

            // Load each image
            _.forEach(imagesToLoad, ([key, value]) => {
                if (value !== null && value !== undefined) {
                    if (typeof value === "object") {
                        interface ImageAtlas {
                            atlas: {
                                src: string;
                                json: string;
                            };
                        }

                        // Handle images with atlas or scale properties
                        if ("atlas" in value) {
                            promises.push(
                                this.scene.load.atlas(
                                    key,
                                    (value as unknown as ImageAtlas).atlas.src,
                                    (value as unknown as ImageAtlas).atlas.json
                                )
                            );
                        } else {
                            // Handle images with subkeys
                            _.forEach(Object.entries(value), ([subKey, subValue]) => {
                                if (subValue !== null && subValue !== undefined) {
                                    if (typeof subValue === "object" && "atlas" in subValue) {
                                        promises.push(
                                            this.scene.load.atlas(
                                                `${key}_${subKey}`,
                                                (subValue as ImageAtlas).atlas.src,
                                                (subValue as ImageAtlas).atlas.json
                                            )
                                        );
                                    } else {
                                        if (typeof subValue === "string") {
                                            if (subValue.endsWith("svg")) {
                                                promises.push(
                                                    this.scene.load.svg(`${key}_${subKey}`, subValue)
                                                );
                                            } else {
                                                promises.push(
                                                    this.scene.load.image(`${key}_${subKey}`, subValue)
                                                );
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    } else if (typeof value === "string") {
                        // Handle images with string values
                        if (value.endsWith("svg")) {
                            promises.push(this.scene.load.svg(key, value));
                        } else {
                            promises.push(this.scene.load.image(key, value));
                        }
                    }
                }
            });

            return Promise.all(promises);
        } catch (err) {
            console.error("Error loading assets:", err);
            return Promise.reject(err);
        }
    }
}

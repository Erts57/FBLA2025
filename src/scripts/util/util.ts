import _ from "lodash";

/**
 * Replaces all dots in a string with underscores.
 * @param key The input string to be modified.
 * @returns The modified string with dots replaced by underscores.
 */
export function getImage(key?: string): string {
    key = key || "none";
    return _.replace(key, /\./g, "_");
}

/**
 * Format a number to include a letter suffix indicating its magnitude.
 * @param num The number to format.
 * @returns The formatted number.
 */
export function formatBigNumber(num: number): string {
    // Number is too big
    if (num >= Number.MAX_SAFE_INTEGER) {
        return "0";
    }
    // Handle quadrillions
    else if (num >= 1000000000000000) {
        return (num / 1000000000000000).toFixed(1).replace(/\.0$/, "") + "Q";
    }
    // Handle trillions
    else if (num >= 1000000000000) {
        return (num / 1000000000000).toFixed(1).replace(/\.0$/, "") + "T";
    }
    // Handle billions
    else if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    // Handle millions
    else if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    // Handle ten-thousands
    else if (num >= 10000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }

    return num.toString();
}

/**
 * Curved interpolation between two values using easing function.
 * @param a The starting value.
 * @param b The ending value.
 * @param t The interpolation factor.
 * @returns The interpolated value.
 */
export function lerpCurved(a: number, b: number, t: number): number {
    return a + (b - a) * (-0.5 * (Math.cos(Math.PI * t) - 1));
}

/**
 * Computes a point on a quadratic bezier curve.
 * @param p0 The start point of the curve.
 * @param p1 The control point of the curve.
 * @param p2 The end point of the curve.
 * @param t The interpolation factor, between 0 and 1.
 * @returns The point on the curve at the given interpolation factor.
 */
export function quadraticBezier(
    p0: { x: number; y: number },
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    t: number
): { x: number; y: number } {
    const x = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x;
    const y = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y;
    return { x, y };
}

/**
 * Adds an image src to an image element in the given element.
 * @param element The parent element to assign the image to.
 */
export function assignImage(element: HTMLElement) {
    /*try {
        const imageElement: HTMLImageElement = element.getElementsByTagName("img")[0];

        const alt: string = imageElement.alt;
        var src: string;

        switch (alt) {
            case "SOMETHING":
                src = require("../../assets/");
                break;

            default:
                // Can only happen if a mod adds ui without an alt or provided image
                console.warn(`No image found for ${alt}. Could not assign image.`);
                src = "";
                break;
        }

        imageElement.src = src;
    } catch (err) {
        console.warn(`No image element found in ${element}. Could not assign image.`);
    }*/
}

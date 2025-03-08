import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

function colorToRGBA(color) {
    // Returns the color as an array of [r, g, b, a] -- all range from 0 - 255
    // color must be a valid canvas fillStyle. This will cover most anything
    // you'd want to use.
    // Examples:
    // colorToRGBA('red')  # [255, 0, 0, 255]
    // colorToRGBA('#f00') # [255, 0, 0, 255]
    let cvs, ctx
    cvs = document.createElement("canvas")
    cvs.height = 1
    cvs.width = 1
    ctx = cvs.getContext("2d")
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 1, 1)
    return ctx.getImageData(0, 0, 1, 1).data
}

function byteToHex(num) {
    // Turns a number (0-255) into a 2-character hex number (00-ff)
    return ("0" + num.toString(16)).slice(-2)
}

export function colorToHex(color: string) {
    // Convert any CSS color to a hex representation
    // Examples:
    // colorToHex('red')            # '#ff0000'
    // colorToHex('rgb(255, 0, 0)') # '#ff0000'
    let rgba, hex
    rgba = colorToRGBA(color)
    hex = [0, 1, 2]
        .map(function (idx) {
            return byteToHex(rgba[idx])
        })
        .join("")
    return "#" + hex
}

/**
 * Converts a hex color code (#RRGGBB) to CSS HSL format without the `hsl()` wrapper.
 *
 * @param {string} hex - The hex color code in the format "#RRGGBB".
 * @returns {string} The HSL representation in the format "H, S%, L%".
 * @throws {Error} If the input is not a valid hex color code.
 */
export function hexToHsl(hex: string): string {
    // Ensure the input is a valid hex color
    if (!/^#([A-Fa-f0-9]{6})$/.test(hex)) {
        throw new Error("Invalid hex color format. Use #RRGGBB")
    }

    // Extract RGB components
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min

    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (delta !== 0) {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
        switch (max) {
            case r:
                h = ((g - b) / delta + (g < b ? 6 : 0)) * 60
                break
            case g:
                h = ((b - r) / delta + 2) * 60
                break
            case b:
                h = ((r - g) / delta + 4) * 60
                break
        }
    }

    return `${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`
}

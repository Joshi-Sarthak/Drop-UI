import {create} from "zustand"
import themes from "./themes.json"

export type Accent = "zinc" | "blue"

export interface Theme {
    mode: "light" | "dark"
    accent: Accent
}

export const useThemeVariables = (selector: string) => {
    const theme = useTheme()
    const css = themes[theme.accent] as string
    return `${selector} ${css}`
}

export const useTheme = create<Theme>()((set) => ({
    mode: "light",
    accent: "blue",
}))

import {produce} from "immer"
import {create} from "zustand"

export interface Theme {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
    border: string
    input: string
    ring: string
    radius?: string
    chart1: string
    chart2: string
    chart3: string
    chart4: string
    chart5: string
}

export interface ThemeState {
    theme: "light" | "dark"
    lightThemeVariables: Theme
    darkThemeVariables: Theme
    setLightMode: () => void
    setDarkMode: () => void
    setThemeVariable: (key: string, value: string) => void
}

export const lightTheme: Theme = {
    background: "0 0% 100%",
    foreground: "240 10% 3.9%",
    card: "0 0% 100%",
    cardForeground: "240 10% 3.9%",
    popover: "0 0% 100%",
    popoverForeground: "240 10% 3.9%",
    primary: "240 5.9% 10%",
    primaryForeground: "0 0% 98%",
    secondary: "240 4.8% 95.9%",
    secondaryForeground: "240 5.9% 10%",
    muted: "240 4.8% 95.9%",
    mutedForeground: "240 3.8% 46.1%",
    accent: "240 4.8% 95.9%",
    accentForeground: "240 5.9% 10%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "0 0% 98%",
    border: "240 5.9% 90%",
    input: "240 5.9% 90%",
    ring: "240 5.9% 10%",
    radius: "0.5rem",
    chart1: "12 76% 61%",
    chart2: "173 58% 39%",
    chart3: "197 37% 24%",
    chart4: "43 74% 66%",
    chart5: "27 87% 67%",
}

export const darkTheme: Theme = {
    background: "240 10% 3.9%",
    foreground: "0 0% 98%",
    card: "240 10% 3.9%",
    cardForeground: "0 0% 98%",
    popover: "240 10% 3.9%",
    popoverForeground: "0 0% 98%",
    primary: "0 0% 98%",
    primaryForeground: "240 5.9% 10%",
    secondary: "240 3.7% 15.9%",
    secondaryForeground: "0 0% 98%",
    muted: "240 3.7% 15.9%",
    mutedForeground: "240 5% 64.9%",
    accent: "240 3.7% 15.9%",
    accentForeground: "0 0% 98%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "0 0% 98%",
    border: "240 3.7% 15.9%",
    input: "240 3.7% 15.9%",
    ring: "240 4.9% 83.9%",
    chart1: "220 70% 50%",
    chart2: "160 60% 45%",
    chart3: "30 80% 55%",
    chart4: "280 65% 60%",
    chart5: "340 75% 55%",
}

const createThemeStore = () =>
    create<ThemeState>()((set) => ({
        theme: "light",
        lightThemeVariables: lightTheme,
        darkThemeVariables: darkTheme,
        setLightMode: () => {
            set(
                produce((state) => {
                    state.theme = "light"
                }),
            )
        },
        setDarkMode: () => {
            set(
                produce((state) => {
                    state.theme = "dark"
                }),
            )
        },
        setThemeVariable: (key: string, value: string) => {
            set(
                produce((state) => {
                    if (state.theme === "light") {
                        state.lightThemeVariables[key] = value
                    } else {
                        state.darkThemeVariables[key] = value
                    }
                }),
            )
        },
    }))

function camelCaseToKebabCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}

export const useThemeStore = createThemeStore()

export function themeToStylesheet(theme: ThemeState): string {
    console.log(theme)
    const themeVariables =
        theme.theme === "light" ? theme.lightThemeVariables : theme.darkThemeVariables
    return Object.entries(themeVariables)
        .map(([key, value]) => `--${camelCaseToKebabCase(key)}: ${value};`)
        .join("\n")
}

export function themeToVariables(theme: ThemeState): Record<string, string> {
    const themeVariables =
        theme.theme === "light" ? theme.lightThemeVariables : theme.darkThemeVariables
    return Object.entries(themeVariables).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [`--${camelCaseToKebabCase(key)}`]: value,
        }),
        {},
    )
}

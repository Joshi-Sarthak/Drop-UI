import {cn} from "@/lib/utils"
import {themeToVariables, useThemeStore} from "@/theme-store"
import {ComponentProps, useId} from "react"

export default function ThemeProvider({
    children,
    className,
    ...props
}: ComponentProps<"div">) {
    const id = useId()
    const theme = useThemeStore()
    const variables = themeToVariables(theme)
    return (
        <div
            {...props}
            id={id}
            className={cn(theme.theme === "dark" && "dark", className)}
            style={variables}
        >
            {children}
        </div>
    )
}

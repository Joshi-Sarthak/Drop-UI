import {cn} from "@/lib/utils"
import {useTheme, useThemeVariables} from "@/theme-store"
import {ComponentProps} from "react"

export default function ThemeProvider({
    children,
    className,
    ...props
}: ComponentProps<"div">) {
    const id = "theme-provider"
    const theme = useTheme()
    const css = useThemeVariables(`#${id}`)
    return (
        <div
            {...props}
            id={id}
            className={cn(theme.mode === "dark" && "dark", className)}
        >
            {children}
            <style dangerouslySetInnerHTML={{__html: css}} />
        </div>
    )
}

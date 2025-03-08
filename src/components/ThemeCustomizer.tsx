import {cn, colorToHex, hexToHsl} from "@/lib/utils"
import {useThemeStore} from "@/theme-store"
import {Moon, Sun} from "lucide-react"
import {Button} from "./ui/button"
import {Input} from "./ui/input"
import {Label} from "./ui/label"
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover"

export default function ThemeCustomizer() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button>Customize Theme</Button>
            </PopoverTrigger>
            <PopoverContent>
                <ThemeCustomizerPopover />
            </PopoverContent>
        </Popover>
    )
}

function ThemeCustomizerPopover() {
    const theme = useThemeStore()
    const isActive = false
    const themeVariables =
        theme.theme === "light" ? theme.lightThemeVariables : theme.darkThemeVariables
    return (
        <div className="flex items-start md:pt-0">
            <div className="space-y-1 pr-2">
                <div className="font-semibold leading-none tracking-tight">
                    Theme Customizer
                </div>
                <div className="text-xs text-muted-foreground">
                    Customize your components colors.
                </div>
                <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
                    <div className="space-y-1.5">
                        <Label className="text-xs">Color</Label>
                        <div className="grid grid-cols-4 gap-2">
                            {Object.entries(themeVariables).map(([key, value]) => (
                                <div key={key} className="flex flex-col gap-1">
                                    <Label>{key}</Label>
                                    <Input
                                        className="shrink-0"
                                        type="color"
                                        value={colorToHex(`hsl(${value})`)}
                                        onChange={(ev) => {
                                            theme.setThemeVariable(
                                                key,
                                                hexToHsl(ev.target.value),
                                            )
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="space-y-1.5">
                    <Label className="text-xs">Mode</Label>
                    <div className="grid grid-cols-3 gap-2">
                        <Button
                            variant={"outline"}
                            size="sm"
                            onClick={theme.setLightMode}
                            className={cn(
                                theme.theme === "light" && "border-2 border-primary",
                            )}
                        >
                            <Sun className="mr-1 -translate-x-1" />
                            Light
                        </Button>
                        <Button
                            variant={"outline"}
                            size="sm"
                            onClick={theme.setDarkMode}
                            className={cn(
                                theme.theme === "dark" && "border-2 border-primary",
                            )}
                        >
                            <Moon className="mr-1 -translate-x-1" />
                            Dark
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

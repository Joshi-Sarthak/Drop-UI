import {Button, Navbar, NavbarBrand, NavbarContent} from "@heroui/react"

export default function NavBar() {
    return (
        <Navbar isBordered className="flex-[0_1_auto]">
            <NavbarContent justify="start">
                <NavbarBrand className="gap-2">
                    <img src="/favicon-light.svg" alt="DropUI" />
                    DropUI
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify="end">
                <Button color="primary">Preview</Button>
            </NavbarContent>
        </Navbar>
    )
}

import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../reducers/userReducer"
import { Navbar, AnchorButton, Alignment, Button, Popover, Menu, Switch } from "@blueprintjs/core"
import { switchDarkMode } from "../reducers/darkModeReducer"

const Navigation = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const darkMode = useSelector(state => state.darkMode)

    const settingsMenu = <Menu>
        <Switch style={{ margin: "0.5em" }} label="Dark Mode" checked={darkMode} onChange={() => dispatch(switchDarkMode())} alignIndicator={Alignment.RIGHT} />
    </Menu>

    return <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading >Blog</Navbar.Heading>
            <Navbar.Divider />
            <AnchorButton className="bp3-minimal" icon="home" text="Home" href="/" />
            <AnchorButton className="bp3-minimal" icon="book" text="Blogs" href="/blogs" />
            <AnchorButton className="bp3-minimal" icon="user" text="Users" href="/users" />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
            {!user && <><AnchorButton rightIcon="new-person" text="Register" href="/register" /> <Navbar.Divider /> <AnchorButton rightIcon="log-in" text="Login" href="/login" /></>}
            {user && <>Hi {user.name}! <Navbar.Divider /> <AnchorButton rightIcon="log-out" text="Logout" onClick={() => dispatch(logout())} /></>}
            <Navbar.Divider />
            <Popover content={settingsMenu}>
                <Button icon="cog" />
            </Popover>
        </Navbar.Group>
    </Navbar>
}

export default Navigation
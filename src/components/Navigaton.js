import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../reducers/userReducer"

const Navigation = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const padding = {
        padding: "1rem"
    }

    return <nav>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {!user && <Link style={padding} to="/login">login</Link>}
        {user && <span style={padding}>Hi {user.name}! <button onClick={() => dispatch(logout())}>logout</button></span>}
    </nav>
}

export default Navigation
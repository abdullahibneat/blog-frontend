import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../reducers/userReducer"

const Navigation = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    return <nav>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        {!user && <Link to="/login">login</Link>}
        {user && <span>Hi {user.name}! <button onClick={() => dispatch(logout())}>logout</button></span>}
    </nav>
}

export default Navigation
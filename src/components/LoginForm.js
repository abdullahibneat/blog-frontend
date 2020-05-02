import React from "react"
import { useDispatch } from "react-redux"
import loginService from "../services/login"
import { setNotification } from "../reducers/notificationReducer"
import { loadUser } from "../reducers/userReducer"

const LoginForm = () => {
    const dispatch = useDispatch()
    
    const onSubmitForm = async event => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value

        try {
            dispatch(loadUser(await loginService.login({ username, password })))
        } catch(err) {
            dispatch(setNotification("Wrong credentials"))
        }
    }

    return <div>
        <form id="loginForm" onSubmit={onSubmitForm}>
            <div>Username: <input id="loginFormUsername" type="text" name="username" /></div>
            <div>Password: <input id="loginFormPassword" type="password" name="password" /></div>
            <button type="submit">Login</button>
        </form>
    </div>
}

export default LoginForm
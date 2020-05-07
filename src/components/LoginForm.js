import React from "react"
import { useDispatch } from "react-redux"
import loginService from "../services/login"
import { setNotification } from "../reducers/notificationReducer"
import { loadUser } from "../reducers/userReducer"
import { FormGroup, Button, InputGroup } from "@blueprintjs/core"

const LoginForm = () => {
    const dispatch = useDispatch()
    
    const onSubmitForm = async event => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value

        try {
            dispatch(loadUser(await loginService.login({ username, password })))
            dispatch(setNotification("Welcome back", "SUCCESS"))
        } catch(err) {
            dispatch(setNotification("Wrong credentials", "ERROR"))
        }
    }

    return <div>
        <form id="loginForm" onSubmit={onSubmitForm}>
            <FormGroup label="Username" labelFor="loginFormUsername" labelInfo="(required)">
                <InputGroup name="username" id="loginFormUsername" placeholder="Username" />
            </FormGroup>
            <FormGroup label="Password" labelFor="loginFormPassword" labelInfo="(required)">
                <InputGroup type="password" name="password" id="loginFormPassword" placeholder="Password" />
            </FormGroup>
            <Button rightIcon="log-in" text="Login" type="submit" />
        </form>
    </div>
}

export default LoginForm
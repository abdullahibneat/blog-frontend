import React from "react"
import { FormGroup, InputGroup, Button } from "@blueprintjs/core"
import userService from "../services/user"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { useHistory } from "react-router-dom"

const RegisterForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const onSubmitForm = async event => {
        event.preventDefault()
        event.persist()
        const newUser = {
            name: event.target.name.value,
            username: event.target.username.value,
            password: event.target.password.value
        }
        try {
            await userService.register(newUser)
            dispatch(setNotification("Your account has been created!", "SUCCESS"))
            event.target.reset()
            history.push("/login")
        } catch (err) {
            dispatch(setNotification(err.response.data.error, "ERROR"))
        }
    }

    return <div>
        <form id="registerForm" style={{width: "40%" }} onSubmit={onSubmitForm}>
            <FormGroup label="Name" labelFor="registerFormName" labelInfo="(required)">
                <InputGroup name="name" id="registerFormName" placeholder="Name" />
            </FormGroup>
            <FormGroup label="Username" labelFor="registerFormUsername" labelInfo="(required)">
                <InputGroup name="username" id="registerFormUsername" placeholder="Username" />
            </FormGroup>
            <FormGroup label="Password" labelFor="registerFormPassword" labelInfo="(required)">
                <InputGroup type="password" name="password" id="registerFormPassword" placeholder="Password" />
            </FormGroup>
            <Button rightIcon="new-person" text="Create account" type="submit" />
        </form>
    </div>
}

export default RegisterForm
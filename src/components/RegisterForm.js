import React, { useState } from "react"
import { FormGroup, InputGroup, Button, Tooltip } from "@blueprintjs/core"
import userService from "../services/user"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { useHistory } from "react-router-dom"

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const lockButton = <Tooltip content={`${showPassword? "Hide" : "Show"} password`}>
        <Button icon={showPassword? "eye-off" : "eye-open"} minimal={true} onClick={() => setShowPassword(!showPassword)} />
    </Tooltip>

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
            history.push("/login")
        } catch (err) {
            dispatch(setNotification(err.response.data.error, "ERROR"))
        }
    }

    return <div>
        <form id="registerForm" onSubmit={onSubmitForm}>
            <FormGroup label="Name" labelFor="registerFormName" labelInfo="(required)">
                <InputGroup name="name" id="registerFormName" placeholder="Name" />
            </FormGroup>
            <FormGroup label="Username" labelFor="registerFormUsername" labelInfo="(required)">
                <InputGroup name="username" id="registerFormUsername" placeholder="Username" />
            </FormGroup>
            <FormGroup label="Password" labelFor="registerFormPassword" labelInfo="(required)">
                <InputGroup type={showPassword? "text" : "password"} name="password" rightElement={lockButton} id="registerFormPassword" placeholder="Password" />
            </FormGroup>
            <Button rightIcon="new-person" text="Create account" type="submit" />
        </form>
    </div>
}

export default RegisterForm
import React from "react"
import PropTypes from "prop-types"

const LoginForm = ({ onSubmitForm, username, onChangeUsername, password, onChangePassword }) => <div>
    <form onSubmit={onSubmitForm}>
        <div>Username: <input type="text" value={username} name="username" onChange={onChangeUsername} /></div>
        <div>Password: <input type="password" value={password} name="password" onChange={onChangePassword} /></div>
        <button type="submit">Login</button>
    </form>
</div>

LoginForm.propTypes = {
    onSubmitForm: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    onChangeUsername: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    onChangePassword: PropTypes.func.isRequired
}

export default LoginForm
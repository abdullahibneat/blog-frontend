import React from "react"

const LoginForm = ({ onSubmitForm, username, onChangeUsername, password, onChangePassword }) => <div>
    <form onSubmit={onSubmitForm}>
        <div>Username: <input type="text" value={username} name="username" onChange={onChangeUsername} /></div>
        <div>Password: <input type="password" value={password} name="password" onChange={onChangePassword} /></div>
        <button type="submit">Login</button>
    </form>
</div>

export default LoginForm
import React from "react"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import NewBlogForm from "./components/NewBlogForm"
import Toggable from "./components/Toggable"
import { useSelector, useDispatch } from "react-redux"
import BlogList from "./components/BlogList"
import { logout } from "./reducers/userReducer"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

const App = () => {
    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    const loginForm = () => <Toggable buttonLabel="login">
        <LoginForm />
    </Toggable>

    const addBlogForm = () => <Toggable buttonLabel="create">
        <NewBlogForm />
    </Toggable>

    return <>
        <Router>
            <Notification />
            <h2>blogs</h2>
            {!user && loginForm()}
            {user && <p>Hi {user.name}! <button onClick={() => dispatch(logout())}>logout</button></p>}
            <Switch>
                <Route path="/">
                    {user && addBlogForm()}
                    <BlogList />
                </Route>
            </Switch>
        </Router>
    </>
}

export default App
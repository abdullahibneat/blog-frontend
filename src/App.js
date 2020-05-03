import React from "react"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import NewBlogForm from "./components/NewBlogForm"
import Toggable from "./components/Toggable"
import { useSelector, useDispatch } from "react-redux"
import BlogList from "./components/BlogList"
import { logout } from "./reducers/userReducer"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import UsersList from "./components/UsersList"
import User from "./components/User"
import Blog from "./components/Blog"

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
                <Route path="/users/:id">
                    <User />
                </Route>
                <Route path="/blogs/:id">
                    <Blog />
                </Route>
                <Route path="/users">
                    <UsersList />
                </Route>
                <Route path="/">
                    {user && addBlogForm()}
                    <BlogList />
                </Route>
            </Switch>
        </Router>
    </>
}

export default App
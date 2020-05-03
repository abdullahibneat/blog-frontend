import React from "react"
import Notification from "./components/Notification"
import NewBlogForm from "./components/NewBlogForm"
import Toggable from "./components/Toggable"
import { useSelector } from "react-redux"
import BlogList from "./components/BlogList"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import UsersList from "./components/UsersList"
import User from "./components/User"
import Blog from "./components/Blog"
import Navigation from "./components/Navigaton"
import LoginForm from "./components/LoginForm"
import "@blueprintjs/core/lib/css/blueprint.css"

const App = () => {
    const user = useSelector(state => state.user)

    const addBlogForm = () => <Toggable buttonLabel="create">
        <NewBlogForm />
    </Toggable>

    return <>
        <Router>
            <Notification />
            <Navigation />

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
                <Route path="/login">
                    {!user && <LoginForm />}
                    {user && <Redirect to="/" />}
                </Route>
                <Route path="/blogs">
                    {user && addBlogForm()}
                    <BlogList />
                </Route>
                <Route path="/">
                    <div>Hello world!</div>
                </Route>
            </Switch>
        </Router>
    </>
}

export default App
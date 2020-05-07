import React from "react"
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
import RegisterForm from "./components/RegisterForm"

const App = () => {
    const user = useSelector(state => state.user)

    const addBlogForm = () => <Toggable buttonLabel="Create">
        <NewBlogForm />
    </Toggable>

    return <>
        <Router>
            <Navigation />

            <div className="container">
                <Switch>
                    <Route path="/users/:id">
                        <User />
                    </Route>
                    <Route path="/blogs/:id">
                        <Blog />
                    </Route>
                    <Route path="/users">
                        <h1>Users</h1>
                        <UsersList />
                    </Route>
                    <Route path="/login">
                        <h1>Login</h1>
                        {!user && <LoginForm />}
                        {user && <Redirect to="/" />}
                    </Route>
                    <Route path="/register">
                        <h1>Register</h1>
                        {!user && <RegisterForm />}
                        {user && <Redirect to="/" />}
                    </Route>
                    <Route path="/blogs">
                        <h1>All blogs</h1>
                        {user && addBlogForm()}
                        <BlogList />
                    </Route>
                    <Route path="/">
                        <div>
                            <h1>Blog application</h1>
                            <p>An application built using React and NodeJS.</p>
                        </div>
                    </Route>
                </Switch>
            </div>
        </Router>
    </>
}

export default App
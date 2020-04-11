import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

    useEffect(() => window.localStorage.setItem("user", JSON.stringify(user)), [user])

    const handleLogin = async event => {
        event.preventDefault()
        try {
            setUser(await loginService.login({ username, password }))
        } catch(err) {
            alert("Wrong credentials")
        }
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>Username: <input type="text" value={username} name="username" onChange={ ({ target }) => setUsername(target.value) } /></div>
            <div>Password: <input type="password" value={password} name="password" onChange={ ({ target }) => setPassword(target.value) } /></div>
            <button type="submit">Login</button>
        </form>
    )

    const blogsContainer = () => (
        <div>
            <h2>blogs</h2>
            <p>Hi {user.name}! <button onClick={event => setUser(null)}>logout</button></p>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )

    return (user === null? loginForm() : blogsContainer())
}

export default App
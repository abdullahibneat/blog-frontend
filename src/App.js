import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")))

    const [newBlogTitle, setNewBlogTitle] = useState("")
    const [newBlogAuthor, setNewBlogAuthor] = useState("")
    const [newBlogURL, setNewBlogURL] = useState("")

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

    const handleNewBlog = async event => {
        event.preventDefault()
        try {
            const newBlog = {
                title: newBlogTitle,
                author: newBlogAuthor,
                url: newBlogURL
            }
            const result = await blogService.create(newBlog, user.token)
            setBlogs(blogs.concat(result))
            setNewBlogTitle("")
            setNewBlogAuthor("")
            setNewBlogURL("")
        } catch(err) {
            console.log(err.message)
        }
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>Username: <input type="text" value={username} name="username" onChange={ ({ target }) => setUsername(target.value) } /></div>
            <div>Password: <input type="password" value={password} name="password" onChange={ ({ target }) => setPassword(target.value) } /></div>
            <button type="submit">Login</button>
        </form>
    )

    const addBlogForm = () => <>
        <h2>Create new</h2>
        <form onSubmit={handleNewBlog}>
            <div>Title: <input type="text" name="title" value={newBlogTitle} onChange={ ({ target }) => setNewBlogTitle(target.value) } /></div>
            <div>Author: <input type="text" name="author" value={newBlogAuthor} onChange={ ({ target }) => setNewBlogAuthor(target.value) } /></div>
            <div>URL: <input type="text" name="url" value={newBlogURL} onChange={ ({ target }) => setNewBlogURL(target.value) } /></div>
            <button type="submit">create</button>
        </form>
    </>

    const blogsContainer = () => (
        <div>
            <h2>blogs</h2>
            <p>Hi {user.name}! <button onClick={event => { setUser(null); window.localStorage.clear() }}>logout</button></p>
            {addBlogForm()}
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )

    return (user === null? loginForm() : blogsContainer())
}

export default App
import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"
import LoginForm from "./components/LoginForm"
import NewBlogForm from "./components/NewBlogForm"
import Toggable from "./components/Toggable"


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")))
    const [notification, setNotification] = useState(null)

    const [newBlogTitle, setNewBlogTitle] = useState("")
    const [newBlogAuthor, setNewBlogAuthor] = useState("")
    const [newBlogURL, setNewBlogURL] = useState("")

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

    useEffect(() => window.localStorage.setItem("user", JSON.stringify(user)), [user])

    const notify = message => {
        setNotification(message)
        setTimeout(() => setNotification(null), 5000)
    }

    const handleLogin = async event => {
        event.preventDefault()
        try {
            setUser(await loginService.login({ username, password }))
            setUsername("")
            setPassword("")
        } catch(err) {
            notify("Wrong credentials")
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
            notify(`A new blog ${newBlogTitle} has been added.`)
            setNewBlogTitle("")
            setNewBlogAuthor("")
            setNewBlogURL("")
        } catch(err) {
            notify(err.message)
        }
    }

    const loginForm = () => <Toggable buttonLabel="login">
        <LoginForm
            onSubmitForm={handleLogin}
            username={username}
            onChangeUsername={({ target }) => setUsername(target.value)}
            password={password}
            onChangePassword={({ target }) => setPassword(target.value)}
        />
    </Toggable>

    const addBlogForm = () => <Toggable buttonLabel="create">
        <NewBlogForm
            onSubmitForm={handleNewBlog}
            title={newBlogTitle}
            onChangeTitle={({ target }) => setNewBlogTitle(target.value)}
            author={newBlogAuthor}
            onChangeAuthor={({ target }) => setNewBlogAuthor(target.value)}
            URL={newBlogURL}
            onChangeURL={({ target }) => setNewBlogURL(target.value)}
        />
    </Toggable>

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

    return (<>
        <Notification message={notification} />
        {user === null? loginForm() : blogsContainer()}
    </>)
}

export default App
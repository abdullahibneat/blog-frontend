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

    const handleNewBlog = async newBlog => {
        try {
            const result = await blogService.create(newBlog, user.token)
            setBlogs(blogs.concat(result))
            notify(`A new blog ${newBlog.title} has been added.`)
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
        <NewBlogForm onSubmitForm={handleNewBlog} />
    </Toggable>

    return (<>
        <Notification message={notification} />
        <h2>blogs</h2>
        {user === null
            ? loginForm()
            : <div>
                <p>Hi {user.name}! <button onClick={() => { setUser(null); window.localStorage.clear() }}>logout</button></p>
                {addBlogForm()}
            </div>
        }
        {blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} />)}
    </>)
}

export default App
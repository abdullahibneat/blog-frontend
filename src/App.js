import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"
import LoginForm from "./components/LoginForm"
import NewBlogForm from "./components/NewBlogForm"
import Toggable from "./components/Toggable"
import { useSelector, useDispatch } from "react-redux"
import { createBlog } from "./reducers/blogReducer"

const App = () => {
    const blogs = useSelector(state => state)
    const dispatch = useDispatch()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")))
    const [notification, setNotification] = useState(null)

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
            dispatch(createBlog(newBlog))
            notify(`A new blog ${newBlog.title} has been added.`)
        } catch(err) {
            notify(err.message)
        }
    }

    const handleBlogLike = async blog => {
        await blogService.updateLikes(blog)
        // handle blog state after like
    }

    const deleteBlog = async blog => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            await blogService.deleteBlog(blog, user.token)
            // handle blog state after deletion
            notify(`${blog.title} has been deleted`)
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

    return blogs
        ? (<>
            <Notification message={notification} />
            <h2>blogs</h2>
            {user === null
                ? loginForm()
                : <div>
                    <p>Hi {user.name}! <button onClick={() => { setUser(null); window.localStorage.clear() }}>logout</button></p>
                    {addBlogForm()}
                </div>
            }
            {blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} updateLikes={handleBlogLike} deleteBlog={deleteBlog} />)}
        </>)
        : null
}

export default App
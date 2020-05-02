import React from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import NewBlogForm from "./components/NewBlogForm"
import Toggable from "./components/Toggable"
import { useSelector, useDispatch } from "react-redux"
import { createBlog } from "./reducers/blogReducer"
import { setNotification } from "./reducers/notificationReducer"

const App = () => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const setUser = () => {} // TODO: Allow user to log out

    const notify = message => dispatch(setNotification(message))

    const handleNewBlog = async newBlog => {
        try {
            dispatch(createBlog(newBlog))
            notify(`A new blog ${newBlog.title} has been added.`)
        } catch(err) {
            notify(err.message)
        }
    }

    const loginForm = () => <Toggable buttonLabel="login">
        <LoginForm />
    </Toggable>

    const addBlogForm = () => <Toggable buttonLabel="create">
        <NewBlogForm onSubmitForm={handleNewBlog} />
    </Toggable>

    return blogs
        ? (<>
            <Notification />
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
        : null
}

export default App
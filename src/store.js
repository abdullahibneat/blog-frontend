import { createStore, applyMiddleware, combineReducers } from "redux";
import blogReducer, { initializeBlogs } from "./reducers/blogReducer";
import userReducer, { loadUser } from "./reducers/userReducer";
import thunk from "redux-thunk";
import notificationReducer from "./reducers/notificationReducer";
import darkModeReducer, { loadDarkMode } from "./reducers/darkModeReducer";

const reducer = combineReducers({
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
    darkMode: darkModeReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

store.dispatch(loadDarkMode())

store.dispatch(initializeBlogs())

const user = JSON.parse(window.localStorage.getItem("user"))
store.dispatch(loadUser(user))

export default store
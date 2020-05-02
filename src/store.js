import { createStore, applyMiddleware } from "redux";
import blogReducer, { initializeBlogs } from "./reducers/blogReducer";
import thunk from "redux-thunk";

const store = createStore(blogReducer, applyMiddleware(thunk))
store.dispatch(initializeBlogs())

export default store
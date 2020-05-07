import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import userService from "../services/user"
import BlogCard from "./BlogCard"
import { Spinner } from "@blueprintjs/core"

const User = () => {
    const [isLoading, setLoading] = useState(true)

    const id = useParams().id

    const [user, setUser] = useState(null)

    useEffect(() => {
        userService.getByID(id)
            .then(u => {
                setUser(u)
            })
            .catch(() => setLoading(false))
    }, [id])

    const blogsContainer = {
        display: "flex",
        flexWrap: "wrap"
    }

    return user
        ? <div>
            <h1>{user.name}</h1>
            {user.blogs && <div>
                <h3>Added blogs</h3>
                {user.blogs.length > 0
                ? <div style={blogsContainer}>
                    {user.blogs.map(blog =>
                        <BlogCard key={blog.id} blog={blog} />
                    )}
                </div>
                : <p>This user has not added any blog yet.</p>}
            </div>}
        </div>
        : isLoading
            ? <Spinner />
            : <h4>User not found</h4>
}

export default User
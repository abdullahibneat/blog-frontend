import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import userService from "../services/user"

const User = () => {
    const id = useParams().id

    const [user, setUser] = useState(null)

    useEffect(() => {
        userService.getByID(id)
            .then(u => setUser(u))
            .catch(err => setUser({
                name: "User does not exists"
            }))
    }, [id])

    return user
        ? <div>
            <h1>{user.name}</h1>
            {user.blogs && <div>
                <h3>Added blogs</h3>
                <ul>
                    {user.blogs.map(b =>
                        <li key={b.id}>{b.title}</li>
                    )}
                </ul>
            </div>}
        </div>
        : null
}

export default User
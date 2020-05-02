import React, { useState, useEffect } from "react"
import userService from "../services/user"

const UsersList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAll().then(u => setUsers(u))
    }, [])

    return users
    ? <table>
        <tr>
            <th>Name</th>
            <th>Blogs created</th>
        </tr>
        {users.map(u =>
            <tr>
                <td>{u.name}</td>
                <td>{u.blogs.length}</td>
            </tr>
        )}
    </table>
    : null
}

export default UsersList
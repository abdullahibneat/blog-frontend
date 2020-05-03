import React, { useState, useEffect } from "react"
import userService from "../services/user"
import { Link } from "react-router-dom"

const UsersList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAll().then(u => setUsers(u))
    }, [])

    return users
    ? <table>
        <tbody>
            <tr>
                <th>Name</th>
                <th>Blogs created</th>
            </tr>
            {users.map(u =>
                <tr key={u.id}>
                    <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                    <td>{u.blogs.length}</td>
                </tr>
            )}
        </tbody>
    </table>
    : null
}

export default UsersList
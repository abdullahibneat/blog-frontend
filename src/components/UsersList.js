import React, { useState, useEffect } from "react"
import userService from "../services/user"

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
                    <td>{u.name}</td>
                    <td>{u.blogs.length}</td>
                </tr>
            )}
        </tbody>
    </table>
    : null
}

export default UsersList
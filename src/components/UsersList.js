import React, { useState, useEffect } from "react"
import userService from "../services/user"
import { Link } from "react-router-dom"
import { HTMLTable } from "@blueprintjs/core";

const UsersList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAll().then(u => setUsers(u))
    }, [])

    return users
    ? <HTMLTable striped={true} style={{ width: "100%" }}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Blogs created</th>
            </tr>
        </thead>
        <tbody>
            {users.map(u =>
                <tr key={u.id}>
                    <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                    <td>{u.blogs.length}</td>
                </tr>
            )}
        </tbody>
    </HTMLTable>
    : null
}

export default UsersList
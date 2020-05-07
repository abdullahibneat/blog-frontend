import React, { useState, useEffect } from "react"
import userService from "../services/user"
import { Link } from "react-router-dom"
import { HTMLTable, Spinner } from "@blueprintjs/core";

const UsersList = () => {
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        userService.getAll().then(u => {
            setUsers(u)
            setLoading(false)
        })
    }, [])

    return users.length > 0
    ? <HTMLTable striped={true}>
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
    : isLoading
        ? <Spinner />
        : <h4>No users found</h4>
}

export default UsersList
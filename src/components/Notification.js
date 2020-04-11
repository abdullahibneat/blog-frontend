import React from "react"

const Notification = ({ message }) => {
    return (message === null? null :
        <><div style={{ borderStyle: "dashed" }}>
            <p align="center">{message}</p>
        </div></>
    )
}

export default Notification
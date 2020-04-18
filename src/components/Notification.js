import React from "react"
import PropTypes from "prop-types"

const Notification = ({ message }) => {
    return (message === null? null :
        <><div id="notification" style={{ borderStyle: "dashed" }}>
            <p id="notificaitonMessage" align="center">{message}</p>
        </div></>
    )
}

Notification.propTypes = {
    message: PropTypes.string
}

export default Notification
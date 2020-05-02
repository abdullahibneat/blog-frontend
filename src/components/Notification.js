import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"

const Notification = () => {
    const message = useSelector(state => state.notification)

    return (message === null? null :
        <><div id="notification" style={{ borderStyle: "dashed" }}>
            <p id="notificationMessage" align="center">{message}</p>
        </div></>
    )
}

Notification.propTypes = {
    message: PropTypes.string
}

export default Notification
import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { Toast, Toaster } from "@blueprintjs/core";

const Notification = () => {
    const message = useSelector(state => state.notification)

    return <Toaster>
        {message? <Toast message={message} /> : null}
    </Toaster>
}

Notification.propTypes = {
    message: PropTypes.string
}

export default Notification
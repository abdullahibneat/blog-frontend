import React, { useState } from "react"
import PropTypes from "prop-types"

const Toggable = (props) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => setVisible(!visible)

    return <div>
        <button style={{ display: visible? "none" : "" }} onClick={toggleVisibility}>{ props.buttonLabel }</button>
        <div style={{ display: visible? "" : "none" }}>
            { props.children }
            <button onClick={toggleVisibility}>close</button>
        </div>
    </div>
}

Toggable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Toggable
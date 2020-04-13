import React, { useState } from "react"

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

export default Toggable
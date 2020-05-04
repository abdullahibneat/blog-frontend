import React, { useState } from "react"
import PropTypes from "prop-types"
import { Button, Card } from "@blueprintjs/core"

const Toggable = (props) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => setVisible(!visible)

    return <div>
        <Button text={props.buttonLabel} icon="plus" style={{ display: visible? "none" : "" }} onClick={toggleVisibility} />
        <Card style={{ display: visible? "" : "none" }}>
            { props.children }
        </Card>
        <Button text="Close" icon="cross" style={{ display: visible? "" : "none", marginTop: "1em" }} onClick={toggleVisibility} />
    </div>
}

Toggable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Toggable
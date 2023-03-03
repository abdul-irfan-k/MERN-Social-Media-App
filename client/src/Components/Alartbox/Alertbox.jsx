import React from 'react'
import './css/index.css'

const Alertbox = ({ setAlertBox, header, callbackFunc }) => {
    const cancelBtnHandler = () => setAlertBox(false)
    const okBtnHandler = () => {
        setAlertBox(false)
        callbackFunc()
    }

    return (
        <>
            <div className="alartbox">
                <span className="alartbox__header">{header}</span>
                <div className="alartbox__buttonbox">
                    <div className="alartbox__buttonbox-button cancel" onClick={cancelBtnHandler}>cancel</div>
                    <div className="alartbox__buttonbox-button ok" onClick={okBtnHandler}>ok</div>
                </div>
            </div>
            <div className='fade-wrapper' ></div>
        </>
    )
}

export default Alertbox

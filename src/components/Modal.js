import React from "react";
import './Modal.css'

const Modal = ({active, setActive, image}) => {
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modalContent active' : 'modalContent'} onClick={e => e.stopPropagation()}>
                <img src={image} alt="source img"/>
            </div>
        </div>
    )
}
export default Modal
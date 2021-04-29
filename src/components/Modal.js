import React from "react";
import './Modal.css'

export default function Modal({active, setActive, item}) {
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modalContent active' : 'modalContent'} onClick={e => e.stopPropagation()}>
                <img src={item} alt="source img"/>
            </div>
        </div>
    )
}
import React, {useState} from "react";
import './style.css'
import Modal from "./Modal";

const Photos = ({data: photoInfo}) => {
    const [modalActive, setModalActive] = useState(false)
    return (
        <div className={'d-flex'} style={{justifyContent: 'center'}}>
            <div className="card" style={{width: "18rem"}}>
                <img src={photoInfo.img_src} className="card-img-top" style={{minHeight: '55%'}}
                     alt="photo from rover"/>
                <div className="card-body">
                    <h5 className="card-title">Date: {photoInfo.earth_date}</h5>
                    <p className="card-text">Rover: {photoInfo.rover.name} <br/>Camera: {photoInfo.camera.name}
                        <br/>sol= {photoInfo.sol}</p>
                    <button onClick={() => setModalActive(true)}
                            className="btn btn-outline-secondary">Open image
                    </button>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive} image={photoInfo.img_src}/>
        </div>
    );
}
export default Photos


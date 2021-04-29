import React, {Component} from 'react';
import './style.css'
import Modal from "./Modal";

class Photos extends Component {
    state = {showModal: false}
    setModal = (bool) => {
        this.setState({showModal: bool})
    }

    render() {
        let {data} = this.props
        return (
            <div className={'d-flex'} style={{justifyContent: 'center'}}>
                <div className="card" style={{width: "18rem"}}>
                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                    <img src={data.img_src} className="card-img-top" style={{minHeight: '55%'}} alt="photo from rover"/>
                    <div className="card-body">
                        <h5 className="card-title">Date: {data.earth_date}</h5>
                        <p className="card-text">Rover: {data.rover.name} <br/>Camera: {data.camera.name}
                            <br/>sol= {data.sol}</p>
                        <button onClick={() => this.setState({showModal: true})}
                                className="btn btn-outline-secondary">Open image
                        </button>
                    </div>
                </div>
                <Modal active={this.state.showModal} setActive={this.setModal} item={data.img_src}/>
            </div>
        );
    }
}

export default Photos;
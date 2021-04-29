import React, {Component} from 'react';
import './style.css'
import Photos from "./Photos";
import {PhotoService} from "../services/PhotoService";

class Main extends Component {
    PhotoService = new PhotoService()
    rovers_cameras = {
        Curiosity: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'],
        Opportunity: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
        Spirit: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES']
    }
    state = {rover: '', camera: '', cameras: [], sol: 1000, loaded: 6, page: 1, response: [], loadStatus: false}

    handleSubmit(e) {
        e.preventDefault()
    }

    updateState = (selectedRover) => {
        if (selectedRover) {
            for (const rover in this.rovers_cameras) {
                if (selectedRover === rover) {
                    this.setState({cameras: this.rovers_cameras[rover]})
                }
            }
        }
    }
    loadMore = () => {
        if (this.state.response.length < this.state.loaded && 25 <= this.state.loaded) {
            this.setState({page: this.state.page + 1})
            this.PhotoService.getAllPhotos(this.state.rover, this.state.sol, this.state.camera, this.state.page + 1)
                .then(res => {
                    this.setState({response: [...this.state.response, ...res.photos]})
                })
        } else {
            this.setState({loaded: this.state.loaded + 6})
        }
        if (this.state.loaded > this.state.response.length && this.state.loaded < 25) {
            this.setState({loadStatus: true})
        } else this.setState({loadStatus: false})

    }
    fetchPhoto = () => {
        this.setState({
            response: [],
            page: 1,
            loaded: 6,
            loadStatus: false
        })
        this.PhotoService.getAllPhotos(this.state.rover, this.state.sol, this.state.camera, 1)
            .then(res => {
                this.setState({response: res.photos})
            })
    }

    render() {
        let {rover, cameras, response, loaded, loadStatus} = this.state
        return (
            <div className={'header'}>
                <nav className="navbar bg-nav">
                    <div className="container-fluid" style={{justifyContent: "center"}}>
                        <span className="navbar-brand mb-0 h1 txt-logo-color">NASA`s expeditions to Mars</span>
                    </div>
                </nav>
                <div style={{display: "flex", justifyContent: 'space-between'}}>
                    <div>
                        <span style={{fontWeight: 'bold'}} className="navbar-brand txt-logo-color">
                           Select Rover to view photos:
                        </span>
                    </div>
                    <div style={{width: "100%", margin: '5px'}}>
                        <form onSubmit={this.handleSubmit} style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%'
                        }}>
                            <select style={{marginLeft: '5px'}} name="Rover" className="form-control"
                                    onChange={(e) => {
                                        this.setState({rover: e.target.value})
                                        this.updateState(e.target.value)
                                    }}>
                                <option value="">Select Rover</option>
                                <option value="Curiosity">Curiosity</option>
                                <option value="Opportunity">Opportunity</option>
                                <option value="Spirit">Spirit</option>
                            </select>
                            <select style={{marginLeft: '5px'}} name="Camera" className="form-control"
                                    onChange={(e) => {
                                        this.setState({camera: e.target.value})
                                    }}>
                                <option value="">All available cameras</option>
                                {cameras.map((camera, index) => <option key={index}
                                                                        value={camera}>{camera} </option>)}
                            </select>
                            <input onChange={({target: {value}}) => this.setState({sol: value})}
                                   placeholder={'Sol (Martian day)(!<=1000!)'}
                                   style={{marginLeft: '5px'}}
                                   className="form-control" type="number"/>
                            <button onClick={this.fetchPhoto} disabled={!rover} style={{marginLeft: '5px'}}
                                    className={"btn btn-danger"}>Submit
                            </button>
                        </form>
                    </div>
                </div>
                <div className={'photo-wrapper'}>
                    <div className={'all-photos'}>
                        {response.slice(0, loaded).map((data, index) => <Photos key={index} data={data}
                                                                                setPage={this.setPage}/>)}
                    </div>

                    {!!response.length && <button className={'btn btn-custom'} disabled={loadStatus}
                                                  onClick={this.loadMore}>{loadStatus ? 'There is nothing further' : 'Load more…'}</button>}
                </div>
            </div>
        );
    }
}

export default Main;
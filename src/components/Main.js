import React, {useState} from "react";
import './style.css'
import Photos from "./Photos";
import PhotoService from "../services/PhotoService";

let rovers_cameras = {
    Curiosity: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'],
    Opportunity: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
    Spirit: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES']
}
const Main = () => {
    const [rover, setRover] = useState('')
    const [camera, setCamera] = useState('')
    const [cameras, setCameras] = useState([])
    const [sol, setSol] = useState(1000)
    const [loaded, setLoaded] = useState(6)
    const [page, setPage] = useState(1)
    const [response, setResponse] = useState([])
    const [loadStatus, setLoadStatus] = useState(false)

    const handleSubmit = (e) => e.preventDefault()
    const updateState = (selectedRover) => {
        if (selectedRover) {
            for (const rover in rovers_cameras) {
                if (selectedRover === rover) {
                    setCameras(rovers_cameras[rover])
                }
            }
        }
    }
    const loadMore = () => {
        if (response.length < loaded && 25 <= loaded) {
            setPage((prev) => prev + 1)
            PhotoService(rover, sol, camera, page + 1)
                .then(res => {
                    setResponse((prev) => [...prev, ...res.photos])
                })
        } else {
            setLoaded((prev) => prev + 6)
        }
        (loaded > response.length && loaded < 25) ? setLoadStatus(true) : setLoadStatus(false)

    }
    const fetchPhoto = () => {
        setResponse([])
        setPage(1)
        setLoaded(6)
        setLoadStatus(false)
        PhotoService(rover, sol, camera, 1)
            .then(res => setResponse(res.photos))
    }

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
                    <form onSubmit={handleSubmit} style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%'
                    }}>
                        <select style={{marginLeft: '5px'}} name="Rover" className="form-control"
                                onChange={(e) => {
                                    setRover(e.target.value)
                                    updateState(e.target.value)
                                }}>
                            <option value="">Select Rover</option>
                            <option value="Curiosity">Curiosity</option>
                            <option value="Opportunity">Opportunity</option>
                            <option value="Spirit">Spirit</option>
                        </select>
                        <select style={{marginLeft: '5px'}} name="Camera" className="form-control"
                                onChange={(e) => {
                                    setCamera(e.target.value)
                                }}>
                            <option value="">All available cameras</option>
                            {cameras.map((camera, index) => <option key={index}
                                                                    value={camera}>{camera} </option>)}
                        </select>
                        <input onChange={({target: {value}}) => setSol(value)}
                               placeholder={'Sol (Martian day)(!<=1000!)'}
                               style={{marginLeft: '5px'}}
                               className="form-control" type="number"/>
                        <button onClick={fetchPhoto} disabled={!rover} style={{marginLeft: '5px'}}
                                className={"btn btn-danger"}>Submit
                        </button>
                    </form>
                </div>
            </div>
            <div className={'photo-wrapper'}>
                <div className={'all-photos'}>
                    {response.slice(0, loaded).map((data, index) => <Photos key={index} data={data}
                                                                            setPage={setPage}/>)}
                </div>

                {!!response.length && <button className={'btn btn-custom'} disabled={loadStatus}
                                              onClick={loadMore}>{loadStatus ? 'There is nothing further' : 'Load more…'}</button>}
            </div>
        </div>
    )
}

export default Main
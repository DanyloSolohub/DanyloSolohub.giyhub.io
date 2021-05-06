const PhotoService = (rover, sol, camera, page) => {
    let url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/'
    let api_key = '&api_key=wlCOc6KyvNpcnolScX392qzjrITeVdOSLQHcK05c'

    return fetch(`${url}${rover}/photos?${sol ? `sol=${sol}` : 'sol=1000'}${camera ? `&camera=${camera}` : ''}${page ? `&page=${page}` : ''}${api_key}`)
        .then(value => value.json())
        .then(value => {
            return value
        })
}
export default PhotoService
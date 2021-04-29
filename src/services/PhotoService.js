export class PhotoService {
    url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/'
    api_key = '&api_key=wlCOc6KyvNpcnolScX392qzjrITeVdOSLQHcK05c'

    getAllPhotos(rover, sol, camera, page) {
        return fetch(`${this.url}${rover}/photos?${sol ? `sol=${sol}` : 'sol=1000'}${camera ? `&camera=${camera}` : ''}${page ? `&page=${page}` : ''}${this.api_key}`)
            .then(value => value.json())
            .then(value => {
                return value
            })
    }

}
import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'http://api.openweathermap.org/data/2.5/'
    })
}
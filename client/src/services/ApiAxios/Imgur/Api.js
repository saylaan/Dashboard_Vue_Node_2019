import axios from 'axios'
import store from '@/store/store'

export default () => { // give back a connector
    return axios.create({ // axios obj that point to the URL
        baseURL: 'https://api.imgur.com/3/',
        headers: {
            Authorization: `Bearer ${store.state.servicesUser.tokenImgur}`
        }
    })
} // Heading our differents end point
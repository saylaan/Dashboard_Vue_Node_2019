import axios from 'axios'
import store from '@/store/store'

export default () => { // give back a connector
    return axios.create({ // axios obj that point to the URL
        baseURL: 'https://test.api.amadeus.com/v1',
        headers: {
            Authorization: `Bearer ${store.state.servicesUser.tokenAmadeus}`
        }
    })
} // Heading our differents end point
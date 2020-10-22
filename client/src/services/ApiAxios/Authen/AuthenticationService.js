import Api from '@/services/ApiAxios/Api'

export default { // Hitting the end point register
    register(credentials) {
        return Api().post('register', credentials)
    },
    signin(credentials) {
        return Api().post('signin', credentials)
    }
}
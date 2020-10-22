import Api from '@/services/ApiAxios/Api'

export default {
    index(search) {
        return Api().get('users', {
            params: {
                search: search
            }
        })
    },
    post(user) {
        return Api().post('users', user)
    },
    getUser(userId) {
        return Api().get(`users/${userId}`)
    },
    put(user) {
        return Api().put(`users/${user.id}`, user)
    },
    delete(userId) {
        return Api().delete(`users/${userId}`)
    }
}
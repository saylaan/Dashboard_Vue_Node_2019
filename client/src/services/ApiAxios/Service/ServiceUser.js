import Api from '@/services/ApiAxios/Api'

export default {
    index() {
        return Api().get('serviceuser');
    },
    get(serviceId) {
        return Api().get(`serviceuser/${serviceId}`);
    },
    getUserService(userId) {
        return Api().get(`userservice/${userId}`);
    },
    post(serviceUser) {
        return Api().post('serviceuser', serviceUser);
    },
    delete(serviceUserId) {
        return Api().delete(`serviceuser/${serviceUserId}`);
    },
    put(serviceUser) {
        return Api().put(`serviceuser/${serviceUser.id}`, serviceUser)
    }
}
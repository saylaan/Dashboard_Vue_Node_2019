import Api from '@/services/ApiAxios/Api'

export default {
    index() {
        return Api().get('services');
    },
    get(serviceId) {
        return Api().get(`services/${serviceId}`);
    }
}
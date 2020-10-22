import Api from '@/services/ApiAxios/Api'

export default {
    index() {
        return Api().get('widgets');
    },
    get(widgetId) {
        return Api().get(`widgets/${widgetId}`);
    }
}
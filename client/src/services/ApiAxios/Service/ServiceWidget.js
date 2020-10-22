import Api from '@/services/ApiAxios/Api'

export default {
    index() {
        return Api().get('servicewidget');
    },
    get(serviceId) {
        return Api().get(`servicewidget/${serviceId}`);
    },
    getWidgetService(userId) {
        return Api().get(`widgetservice/${widgetId}`);
    }
}
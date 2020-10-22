import Api from '@/services/ApiAxios/Api'

export default {
    index() {
        return Api().get('widgetuser');
    },
    get(widgetId) {
        return Api().get(`widgetuser/${widgetId}`);
    },
    getUserWidget(userId) {
        return Api().get(`userwidget/${userId}`);
    },
    post(widgetUser) {
        return Api().post('widgetuser', widgetUser);
    },
    delete(widgetUserId) {
        return Api().delete(`widgetuser/${widgetUserId}`);
    },
    put(widgetUser) {
        return Api().put(`widgetuser/${widgetUser.id}`, widgetUser)
    }
}
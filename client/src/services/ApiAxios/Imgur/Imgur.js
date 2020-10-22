import Api from '@/services/ApiAxios/Imgur/Api'

export default {
    post(file) {
        return Api().post('upload', file)
    },

    async getImages() {
        return (
            Api().get(`/account/me/images`)
            .catch(function (error) {
                return error;
            })
        )
    },

    async getAlbums() {
        return (
            Api().get(`/account/me/albums`)
            .catch(function (error) {
                return error;
            })
        )
    },

    async getImagesFromAlbum(id) {
        return (
            Api().get('/account/me/album/' + id)
            .catch(function (error) {
                return error;
            })
        )
    }
}

// index(search) {
//     return Api().get('users', {
//         params: {
//             search: search
//         }
//     })
// },
// post(user) {
//     return Api().post('users', user)
// },
// getUser(userId) {
//     return Api().get(`users/${userId}`)
// },
// put(user) {
//     return Api().put(`users/${user.id}`, user)
// },
// delete(userId) {
//     return Api().delete(`users/${userId}`)
// }
const config = require('../../config/config')
const isAuthenticated = require('../../policies/isAuthenticated')

// const accessToken = this.servicesUser.tokenImgur;
const clientId = "38968287e70de92";

module.exports = (app) => {
    app.post('/upload',
        isAuthenticated,
        (req, res) => {
            console.log(req.body)
            console.log('IM IN REQUEST IMGUR')
            // var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            //var apiUrl = 'https://api.imgur.com/3/';
            // var xmlHttp = new XMLHttpRequest();
            // xmlHttp.open("POST", apiUrl + "upload", false);
            // xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*');
            // xmlHttp.setRequestHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, X-Auth-Token');
            // xmlHttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
            // xmlHttp.setRequestHeader("Authorization", "Client-ID " + clientId);
            // return xmlHttp.send({image: req.body.file.value, name: "Test", title: "test", description: "test test test"});
            // PROCESS FUNCTION HERE
            return res.send({image: req.body.file, name: "Test", title: "test", description: "test test test"});
            // return res.send({image: req.body.file, name: "Test", title: "test", description: "test test test"});
        })
}


// app.get('/users',
//     isAuthenticated,
//     UsersController.index)
// app.get('/users/:userId',
//     isAuthenticated,
//     UsersController.getUser) // req.params.userId
// app.post('/users',
//     isAuthenticated,
//     UsersController.post) // req.body
// app.delete('/users/:userId',
//     isAuthenticated,
//     UsersController.delete) // req.params.userId
// app.put('/users/:userId',   
//     isAuthenticated,
//     UsersController.put)// req.body
> Project DEV_dashboard_2019 - EPITECH

# Guide USER
https://katsarosia.gitbook.io/epi-dashboard/

# Build
## Build Client

Look README.md inside ./client

## Build Server

Look README.md inside ./server

# Docker Build

docker-compose exec {service name} sh

> DockerFile in server and client
> docker-compose.yml

docker-compose up

# Development Documentation

## Log ADMIN for sign in in administration account
> user : admin
> password : ChangeMe123

## FRONT-END
> Vue.JS + Vuetify (Framework FRONT-END) + Vuex
https://vuejs.org/v2/guide/

### Vuex
https://vuex.vuejs.org/

### Vuetify
https://vuetifyjs.com/en/getting-started/quick-start/


### Architecture and use of files inside /src

1. COMPONENTS
> Different components files for all view of the app .vue
2. ROUTER
> Define all route available for the client app
> Link route with components
3. SERVICES
> All services such as Amadeus / ApiAxios / OpenWeather
> ApiAxios : API made in back-end server
4. STORE
> all state for runtime app inside local storage 'vuex'
5. App.vue
> main vue called in main.js
6. main.js
> main file.js for config Vue

## BACK-END
### SERVER
> Express
https://expressjs.com/

### API
> SQLite3 - Sequelize
https://www.sqlite.org/index.html
https://sequelize.org/master/manual/getting-started.html

> DB
file database in ./server/tabtracker.sqlite
can be open with https://sqliteonline.com/
The database shema : dbServerDashboard.png

> Documentation API
https://documenter.getpostman.com/view/3997320/SzfB16sH

### Authentication
> Passport : JWT + IMGUR + GOOGLE
http://www.passportjs.org/packages/passport-google-oauth2/
http://www.passportjs.org/packages/passport-jwt/
http://www.passportjs.org/packages/passport-imgur/

### Architecture and use of files

1. CONFIG
> all configuration for the database / authentication / port
2. CONTROLLERS
> all controlers use by route in ./routes
3. MODELS
> all database models use for the database sqlite
4. OBJECT
> all object need for the about.json
5. POLICIES
> AuthenticationController : Controller for checking policy of register
> isAuthenticated : made for checking the if user is authenticate in front-end to allow use of controller
> passport : all config for passport Strategy use in the app (Google / Imgur / JWT)
6. ROUTES
> All route enable for the back-end express server link with sequelize ORM
7. app.js
> main index.js for launching the server express
8. combined.log + error.log
> Logs for Api access such as imgur / google / amadeus using winston

### Tutorial
>Inside ./TutorialNodeVue
- ExpressNode (Back-end server)
- VueJS (Client APP)
- Vuetify (Framework FRONT)

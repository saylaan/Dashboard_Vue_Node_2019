const {
    sequelize,
    User,
    Service,
    Widget,
    ServiceUser,
    ServiceWidget,
    WidgetUser
} = require('../src/models')


const users = require('./User/users.json')

const services = require('./Service/services.json')
const widgets = require('./Service/widgets.json')
const servicewidgets = require('./Service/servicewidgets.json')
const serviceusers = require('./Service/serviceusers.json')
const widgetusers = require('./Service/widgetusers.json')

sequelize.sync({ force: true })
    .then(async function() {
        /* ####################################################################### */
        /* USER */
        await Promise.all(
            users.map(user => {
                User.create(user)
            })
        )

        /* ####################################################################### */
        /* SERVICE */

        await Promise.all(
            widgets.map(widget => {
                Widget.create(widget)
            })
        )
        await Promise.all(
            services.map(service => {
                Service.create(service)
            })
        )
        await Promise.all(
                servicewidgets.map(servicewidget => {
                    ServiceWidget.create(servicewidget)
                })
            )
            // await Promise.all(
            //     serviceusers.map(serviceuser => {
            //         ServiceUser.create(serviceuser)
            //     })
            // )
        await Promise.all(
            widgetusers.map(widgetuser => {
                WidgetUser.create(widgetuser)
            })
        )
    })
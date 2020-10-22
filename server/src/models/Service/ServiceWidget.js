module.exports = (sequelize, DataTypes) => {
    const ServiceWidget = sequelize.define('ServiceWidget', {}, {
        timestamps: false
    })

    ServiceWidget.associate = function(models) {
        ServiceWidget.belongsTo(models.Service)
        ServiceWidget.belongsTo(models.Widget)
    }
    return ServiceWidget
}
module.exports = (sequelize, DataTypes) => {
    const ServiceUser = sequelize.define('ServiceUser', {
        account: {
            type: DataTypes.STRING,
            allowNull: true
        },
        data: {
            type: DataTypes.STRING,
            allowNull: true
        },
        data_bis: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        timestamps: false
    })

    ServiceUser.associate = function(models) {
        ServiceUser.belongsTo(models.Service)
        ServiceUser.belongsTo(models.User)
    }
    return ServiceUser
}
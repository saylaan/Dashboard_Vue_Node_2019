module.exports = (sequelize, DataTypes) => {
    const WidgetUser = sequelize.define('WidgetUser', {
        x: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        y: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        param: {
            type: DataTypes.STRING,
            allowNull: true
        },
        param_two: {
            type: DataTypes.STRING,
            allowNull: true
        },
        param_three: {
            type: DataTypes.STRING,
            allowNull: true
        },
        param_four: {
            type: DataTypes.STRING,
            allowNull: true
        },
        param_five: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false
    })

    WidgetUser.associate = function(models) {
        WidgetUser.belongsTo(models.Widget)
        WidgetUser.belongsTo(models.User)
    }
    return WidgetUser
}
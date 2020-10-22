module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true // really important for one data / no more
        },
        email: DataTypes.STRING,
        active_hash: DataTypes.STRING,
        salt: DataTypes.STRING,
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        modify_gridster: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    }, {
        timestamps: false
    })
    return User
}
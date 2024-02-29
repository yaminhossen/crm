module.exports = (sequelize, DataTypes) => {
    
    const User = sequelize.define("user", {
        user_uid: {
            type: DataTypes.BIGINT
        },
        user_name: {
            type: DataTypes.STRING(30)
        },
        password: {
            type: DataTypes.STRING
        },
        // confirm_password: {
        //     type: DataTypes.STRING
        // },
        email: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.ENUM('admin', 'moderator','employee', 'student')
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return User

}
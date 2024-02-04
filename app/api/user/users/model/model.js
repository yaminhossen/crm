module.exports = (sequelize, DataTypes) => {
    
    const User = sequelize.define("user", {
        user_uid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        user_name: {
            type: DataTypes.STRING(30)
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.ENUM('admin', 'moderator', 'student')
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return User

}
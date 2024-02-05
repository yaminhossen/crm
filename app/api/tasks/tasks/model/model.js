module.exports = (sequelize, DataTypes) => {
    
    const User_info = sequelize.define("user_info", {
        user_id: {
            type: DataTypes.BIGINT
        },
        first_name: {
            type: DataTypes.STRING(30)
        },
        phone_number: {
            type: DataTypes.STRING(20)
        },
        last_name: {
            type: DataTypes.STRING(20)
        },
        designation: {
            type: DataTypes.STRING(30)
        },
        date_of_birth: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return User_info

}
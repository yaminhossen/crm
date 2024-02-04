module.exports = (sequelize, DataTypes) => {
    
    const User_designation = sequelize.define("user_designation", {
        user_id: {
            type: DataTypes.BIGINT.UNSIGNED,
        },
        designation: {
            type: DataTypes.STRING(50),
        },
        description: {
            type: DataTypes.TEXT,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return User_designation

}
module.exports = (sequelize, DataTypes) => {
    
    const user_work_user = sequelize.define("user_work_user", {
        user_id: {
            type: DataTypes.BIGINT.UNSIGNED
        },
        work_id: {
            type: DataTypes.BIGINT.UNSIGNED
        },
        department_id: {
            type: DataTypes.BIGINT.UNSIGNED
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return user_work_user

}
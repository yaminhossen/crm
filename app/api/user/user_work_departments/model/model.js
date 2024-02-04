module.exports = (sequelize, DataTypes) => {
    
    const User_work_department = sequelize.define("user_work_department", {
        work_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            
        },
        title: {
            type: DataTypes.STRING(25),
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return User_work_department

}
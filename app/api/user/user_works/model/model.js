module.exports = (sequelize, DataTypes) => {
    
    const User_work = sequelize.define("user_work", {
        title: {
            type: DataTypes.STRING(150),
            
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return User_work

}
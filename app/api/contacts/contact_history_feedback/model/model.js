module.exports = (sequelize, DataTypes) => {
    
    const Customer_group = sequelize.define("Customer_group", {
        title: {
            type: DataTypes.STRING(50)
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Customer_group

}
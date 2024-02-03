module.exports = (sequelize, DataTypes) => {
    
    const Customer_group_customer = sequelize.define("customer_group_customer", {
        customer_group_id: {
            type: DataTypes.STRING(50)
        },
        customer_id: {
            type: DataTypes.STRING(50)
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Customer_group_customer

}
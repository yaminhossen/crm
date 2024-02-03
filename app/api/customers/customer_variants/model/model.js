module.exports = (sequelize, DataTypes) => {
    
    const Customer_variant = sequelize.define("customer_variant", {
        title: {
            type: DataTypes.STRING(50)
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Customer_variant

}
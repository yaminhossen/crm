module.exports = (sequelize, DataTypes) => {
    
    const Customer_variant_customer = sequelize.define("customer_variant_customer", {
        customer_id: {
            type: DataTypes.BIGINT.UNSIGNED,
        },
        variant_id: {
            type: DataTypes.BIGINT.UNSIGNED,
        },
        variant_value_id: {
            type: DataTypes.BIGINT.UNSIGNED,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Customer_variant_customer

}
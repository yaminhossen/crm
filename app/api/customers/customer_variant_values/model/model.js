module.exports = (sequelize, DataTypes) => {
    
    const Customer_variant_values = sequelize.define("customer_variant_value", {
        variant_id: {
            type: DataTypes.BIGINT.UNSIGNED,
        },
        title: {
            type: DataTypes.STRING(50)
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Customer_variant_values

}
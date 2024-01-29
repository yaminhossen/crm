module.exports = (sequelize, DataTypes) => {
    
    const Customer_contact_numbers = sequelize.define("customer_contact_numbers", {
        customer_id: {
            type: DataTypes.BIGINT.UNSIGNED
        },
        operator: {
            type: DataTypes.STRING(30)
        },
        details: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Customer_contact_numbers

}
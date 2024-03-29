module.exports = (sequelize, DataTypes) => {
    
    const contact_appointment = sequelize.define("contact_appointment", {
        contact_number_id: {
            type: DataTypes.STRING
        },
        customer_id: {
            type: DataTypes.BIGINT.UNSIGNED
        },
        date: {
            type: DataTypes.DATE
        },
        contact_type: {
            type: DataTypes.STRING
        },
        note: {
            type: DataTypes.STRING
        },
        creator: {
            type: DataTypes.BIGINT.UNSIGNED
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return contact_appointment

}
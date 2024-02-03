module.exports = (sequelize, DataTypes) => {
    
    const Contact_appointment_reason = sequelize.define("contact_appointment_reason", {
        contact_reason_id: {
            type: DataTypes.BIGINT.UNSIGNED,
        },
        contact_appointment_id: {
            type: DataTypes.BIGINT.UNSIGNED,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Contact_appointment_reason

}
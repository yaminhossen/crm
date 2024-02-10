module.exports = (sequelize, DataTypes) => {
    
    const Contact_history_reason = sequelize.define("contact_history_reason", {
        contact_histories_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            
        },
        reason_id: {
            type: DataTypes.BIGINT.UNSIGNED,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Contact_history_reason

}
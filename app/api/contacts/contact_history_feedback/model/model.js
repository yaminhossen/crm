module.exports = (sequelize, DataTypes) => {
    
    const Contact_history_feedback = sequelize.define("contact_history_feedback", {
        contact_history_id: {
            type: DataTypes.BIGINT.UNSIGNED
        },
        date: {
            type: DataTypes.DATE
        },
        feedback_type: {
            type: DataTypes.STRING(200)
        },
        notes: {
            type: DataTypes.STRING(150)
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Contact_history_feedback

}
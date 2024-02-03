module.exports = (sequelize, DataTypes) => {
    
    const Lead = sequelize.define("lead", {
        customer_id: {
            type: DataTypes.BIGINT.UNSIGNED
        },
        lead_status: {
            type: DataTypes.STRING(50)
        },
        lead_source: {
            type: DataTypes.STRING(150)
        },
        assigned_to: {
            type: DataTypes.BIGINT
        },
        qualification_notes: {
            type: DataTypes.TEXT
        },
        follow_up_date: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Lead

}
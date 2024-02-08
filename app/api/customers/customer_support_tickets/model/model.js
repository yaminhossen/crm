module.exports = (sequelize, DataTypes) => {
    
    const Customer_support_ticket = sequelize.define("customer_support_ticket", {
        customer_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            
        },
        ticket_uuid: {
            type: DataTypes.STRING(50)
        },
        subject: {
            type: DataTypes.TEXT
        },
        description: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        priority: {
            type: DataTypes.ENUM(['high', 'emergency', 'low'])
        },
        assigned_to: {
            type: DataTypes.BIGINT
        },
        is_complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    })

    return Customer_support_ticket

}
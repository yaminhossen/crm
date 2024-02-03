module.exports = (sequelize, DataTypes) => {
    
    const Customer = sequelize.define("calender_events", {
        customer_id: {
            type: DataTypes.BIGINT.UNSIGNED
        },
        event_date: {
            type: DataTypes.DATE
        },
        event_description: {
            type: DataTypes.STRING(200)
        },
        event_type: {
            type: DataTypes.STRING(100)
        },
        creator: {
            type: DataTypes.STRING(30)
        },
        meet_link: {
            type: DataTypes.STRING(250)
        },
        is_complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Customer

}
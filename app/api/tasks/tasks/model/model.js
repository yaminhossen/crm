module.exports = (sequelize, DataTypes) => {
    
    const Task = sequelize.define("task", {
        title: {
            type: DataTypes.STRING(30)
        },
        end_time: {
            type: DataTypes.DATE
        },
        description: {
            type: DataTypes.TEXT
        },
        is_complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        is_urgent: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Task

}
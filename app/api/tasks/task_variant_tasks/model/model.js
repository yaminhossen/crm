module.exports = (sequelize, DataTypes) => {
    
    const Task_variant_task = sequelize.define("task_variant_task", {
        task_id: {
            type: DataTypes.BIGINT.UNSIGNED
        },
        variant_id: {
            type: DataTypes.BIGINT.UNSIGNED
        },
        task_variant_value_id: {
            type: DataTypes.BIGINT.UNSIGNED
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Task_variant_task

}
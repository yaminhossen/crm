module.exports = (sequelize, DataTypes) => {
    
    const Task_variant_value = sequelize.define("task_variant_value", {
        task_variant_id: {
            type: DataTypes.BIGINT.UNSIGNED,
        },
        title: {
            type: DataTypes.STRING(150),
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Task_variant_value

}
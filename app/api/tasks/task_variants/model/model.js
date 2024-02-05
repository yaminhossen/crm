module.exports = (sequelize, DataTypes) => {

    const Task_variant = sequelize.define("task_variant", {
        title: {
            type: DataTypes.STRING(50),
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    })

    return Task_variant

}
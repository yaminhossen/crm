const db = require('../../../db');
const Task = require('../../tasks/model/model');
module.exports = (sequelize, DataTypes) => {

    const Task_user = sequelize.define("task_user", {
        task_id: {
            type: DataTypes.BIGINT.UNSIGNED,
        },
        user_id: {
            type: DataTypes.BIGINT.UNSIGNED,
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

    return Task_user

}
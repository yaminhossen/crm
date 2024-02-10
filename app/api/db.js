// const dbConfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../../configs/db.config.js');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)


sequelize.authenticate()
    .then(() => {
        console.log('connected..');
    })
    .catch(err => {
        console.log('Error' + err);
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// db.products = require('./product/model/model.js')(sequelize, DataTypes)

// user
db.user_Designations = require('./user/user_designations/model/model.js')(sequelize, DataTypes)
db.user_infos = require('./user/user_infos/model/model.js')(sequelize, DataTypes)
db.user_work_departments = require('./user/user_work_departments/model/model.js')(sequelize, DataTypes)
db.user_work_users = require('./user/user_work_users/model/model.js')(sequelize, DataTypes)
db.user_works = require('./user/user_works/model/model.js')(sequelize, DataTypes)
db.users = require('./user/users/model/model.js')(sequelize, DataTypes)

// customer DB
db.customer_support_tickets = require('./customers/customer_support_tickets/model/model.js')(sequelize, DataTypes)
db.customers = require('./customers/customer/model/model.js')(sequelize, DataTypes)
db.calender_events = require('./customers/calender_events/model/model.js')(sequelize, DataTypes)
db.customer_contact_numbers = require('./customers/customer_contact_numbers/model/model.js')(sequelize, DataTypes)
db.customer_group_customers = require('./customers/customer_group_customers/model/model.js')(sequelize, DataTypes)
db.customer_relevent_documents = require('./customers/customer_relevent_documents/model/model.js')(sequelize, DataTypes)
db.customer_variant_customers = require('./customers/customer_variant_customers/model/model.js')(sequelize, DataTypes)
db.customer_variant_values = require('./customers/customer_variant_values/model/model.js')(sequelize, DataTypes)
db.customer_variants = require('./customers/customer_variants/model/model.js')(sequelize, DataTypes)
db.customer_groups = require('./customers/customer_groups/model/model.js')(sequelize, DataTypes)

// contact DB
db.contact_appointment_reasons = require('./contacts/contact_appointment_reason/model/model.js')(sequelize, DataTypes)
db.contact_appointments = require('./contacts/contact_appointments/model/model.js')(sequelize, DataTypes)
db.contact_histories = require('./contacts/contact_histories/model/model.js')(sequelize, DataTypes)
db.contact_history_feedbacks = require('./contacts/contact_history_feedback/model/model.js')(sequelize, DataTypes)
db.contact_history_reasons = require('./contacts/contact_history_reason/model/model.js')(sequelize, DataTypes)
db.contact_reasons = require('./contacts/contact_reasons/model/model.js')(sequelize, DataTypes)
db.crm_contact_numbers = require('./contacts/crm_contact_numbers/model/model.js')(sequelize, DataTypes)
db.leads = require('./contacts/leads/model/model.js')(sequelize, DataTypes)


// task management DB
db.task_users = require('./tasks/task_users/model/model.js')(sequelize, DataTypes)
db.tasks = require('./tasks/tasks/model/model.js')(sequelize, DataTypes)
db.task_variants = require('./tasks/task_variants/model/model.js')(sequelize, DataTypes)
db.task_variant_values = require('./tasks/task_variant_values/model/model.js')(sequelize, DataTypes)
db.task_variant_tasks = require('./tasks/task_variant_tasks/model/model.js')(sequelize, DataTypes)

/** relations */
// task related relation

db.task_users.belongsTo(db.tasks, {
    foreignKey: 'task_id'
});
db.task_users.belongsTo(db.users, {
    foreignKey: 'user_id'
});
db.tasks.hasMany(db.task_users, {
    foreignKey: 'task_id',
});

db.tasks.belongsToMany(db.task_variants, {
    through: db.task_variant_tasks,
    foreignKey: 'task_id'
});
db.task_variants.belongsToMany(db.tasks, {
    through: db.task_variant_tasks,
    foreignKey: 'variant_id'
});
db.task_variants.hasMany(db.task_variant_values, {
    foreignKey: 'task_variant_id'
});

// db.sequelize.sync({ force: false })
//     .then(() => {
//         console.log('yes sequelize re-sync done!');
//     })




module.exports = db
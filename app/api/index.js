// const dbConfig = require("../config/dbConfig");

const {Sequelize, DataTypes} = require('sequelize');
const dbConfig = require('../../configs/db.config.js');



const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min:dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)


sequelize.authenticate()
.then(() =>{
    console.log('connected..');
})
.catch(err => {
    console.log('Error' + err);
})

const db = {} 

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./product/model/model.js')(sequelize, DataTypes)
db.customer_support_tickets = require('./customers/customer_support_tickets/model/model.js')(sequelize, DataTypes)
db.customers = require('./customers/customer/model/model.js')(sequelize, DataTypes)
db.calender_events = require('./customers/calender_events/model/model.js')(sequelize, DataTypes)

db.sequelize.sync({force: false})
.then(()=>{
    console.log('yes sequelize re-sync done!');
})


// One to Many Relation 
// this would be work for the controller 

// db.products.hasMany(db.reviews, {
//     foreignKey: 'product_id',
//     as: 'reviews'
// })

// db.reviews.belongsTo(db.products, {
//     foreignKey: 'product_id', 
//     as: 'product'
// })



module.exports = db
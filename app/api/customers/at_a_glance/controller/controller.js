const db = require('../../../db')
const { Op } = require('sequelize');
const moment = require('moment');

// const db = db

// create main model 
const Customer_DataTable = db.customers
const Contact_history_DataTable = db.contact_histories
const Contact_history_feedback_DataTable = db.contact_history_feedbacks

// main works

// 1. create item

const store = async (req, res) => {

    let info = {
        uuid: req.body.uuid,
        full_name: req.body.full_name,
        email: req.body.email,
        contact_number: req.body.contact_number,
        address: req.body.address
    }

    const item = await Customer_DataTable.create(info)
    res.status(200).send(item)

}

// Function to count users created per month
const getUsersPerMonth = async () => {
    try {
        const result = await Customer_DataTable.findAll({
            attributes: [
                [db.sequelize.fn('YEAR', db.sequelize.col('createdAt')), 'year'],
                [db.sequelize.fn('MONTH', db.sequelize.col('createdAt')), 'month'],
                [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'count']
            ],
            group: [db.sequelize.fn('YEAR', db.sequelize.col('createdAt')), db.sequelize.fn('MONTH', db.sequelize.col('createdAt'))]
        });
        console.log('per monthe result',result);
        // return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


// Function to find all customers
const findAllCustomers = async () => {
    try {
        const customers = await Customer_DataTable.count();
        console.log('all customer', customers);
        // return customers;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Function to find all customers
const findTotalInterestedCustomers = async () => {
    try {
        const customers = await Contact_history_feedback_DataTable.count({ where: { 
            feedback_type: 'agree'
        }});
        console.log('all interested customer', customers);
        // return customers;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Function to find all customers
const findTotalAdmittedCustomers = async () => {
   
    try {
        const result = await Customer_DataTable.findAll({
          attributes: [
            [db.Sequelize.fn('YEAR', db.Sequelize.col('admission_date')), 'year'],
            [db.Sequelize.fn('MONTH', db.Sequelize.col('admission_date')), 'month'],
            [db.Sequelize.fn('COUNT', db.Sequelize.col('*')), 'count']
          ],
          where: {
            is_admitted: true,
            admission_date: {
              [Op.not]: null // Ensure admission_date is not null
            }
          },
          group: [
            db.Sequelize.fn('YEAR', db.Sequelize.col('admission_date')),
            db.Sequelize.fn('MONTH', db.Sequelize.col('admission_date'))
          ]
        });
        console.log('per monthe result',result);
        // return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};



// Function to find total pending customers with next_contact_date after the current day
const findPendingCustomers = async () => {
    try {
        // Get the current date
        const currentDate = moment().startOf('day');

        // Find customers with next_contact_date after the current date
        const customers = await Contact_history_DataTable.count({
            where: {
                next_contact_date: {
                    [Op.not]: null, // Ensure next_contact_date is not null
                    [Op.gte]: currentDate.toDate() // Check if next_contact_date is after or equal to the current date
                }
            }
        });

        console.log('Total pending customers with next contact date after or on the current day:', customers);
        // return customers;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};



module.exports = {
    store,
    getUsersPerMonth,
    findAllCustomers,
    findPendingCustomers,
    findTotalInterestedCustomers,
    findTotalAdmittedCustomers,
}
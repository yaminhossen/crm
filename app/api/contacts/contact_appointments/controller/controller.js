const { paginate } = require('../../../../utilites/paginate')
const db = require('../../../db')

// const db = db

// create main model 
const appointment_dataTable = db.contact_appointments
const reason_dataTable = db.contact_reasons
const Customer_dataTable = db.customers
const CRM_contact_number_dataTable = db.crm_contact_numbers

// main works

// 1. create item

const store = async (req, res) => {

    let info = {
        contact_number_id: req.body.contact_number_id,
        customer_id: req.body.customer_id,
        date: req.body.date,
        contact_type: req.body.contact_type,
        note: req.body.note,
        creator: req.user.id
    }

    const item = await appointment_dataTable.create(info)
    res.status(200).send(item)

}

// 2. get all items

const All = async (req, res) => {
    
    let items = await appointment_dataTable.findAll({})
    res.status(200).send(items)
}


// 2.1 get all data by paginate
const PaginateData = async (req, res) => {
    const { Op } = require('sequelize');
    let searchKey = req.query.search_key;
    let query = {
        order: [['id', 'DESC']],
        include: [
            {
                model: Customer_dataTable
            },
            {
                model: CRM_contact_number_dataTable
            },
        ]
    };
    if (searchKey) {
        query.where = {
            [Op.or]: [
                { contact_type: { [Op.like]: `%${searchKey}%` } },
                { note: { [Op.like]: `%${searchKey}%` } },
                { contact_number_id: { [Op.like]: `%${searchKey}%` } },
                { customer_id: { [Op.like]: `%${searchKey}%` } },
                { date: { [Op.like]: `%${searchKey}%` } },
            ]
        };
    }
    let items = await paginate(req, appointment_dataTable, parseInt(req.query.page_limit||10), query);
    res.status(200).send(items);
}
// 3. get single item

const get = async (req, res) => {
    
    let id = req.params.id
    let item = await appointment_dataTable.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: Customer_dataTable
            },
            {
                model: CRM_contact_number_dataTable
            },
        ]
        // include: [
        //     {
        //         model: reason_dataTable,
        //     }
        // ]
    })
    res.status(200).send(item)
}

// 4. update items

const update = async (req, res) => {
    
    let id = req.body.id
    // let id = req.params.id
    const item = await appointment_dataTable.update(req.body, { where: { id: id }})
    res.status(200).send(item)
}

// 5. delete item

// const destroy = async (req, res) => {
    
//     let id = req.params.id
//     await appointment_dataTable.destroy({ where: { id: id }})
//     res.status(200).send('item is deleted !')
// }
// 5. delete item
const destroy = async (req, res) => {

    // Find the model data by ID
    let item = await appointment_dataTable.findOne({ where: { id: req.body.id } })
    // console.log('item', item.status);
    // res.status(200).send(item)

        item.status = 0;

        // // Save the changes
        await item.save();
        data = {
            status: 'success',
            data: item,
            message: "data delete successfully",
            status_code: 201,
        };
        res.status(200).send(data)
   
}
// 6. get published item

const getPublisheditem = async (req, res) => {

    const items = await appointment_dataTable.findAll({ where: { published: true }})
    res.status(200).send(items)
}



module.exports = {
    store,
    All,
    get,
    update,
    destroy,
    getPublisheditem,
    PaginateData
}
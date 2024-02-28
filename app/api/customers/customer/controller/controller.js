const { paginate } = require('../../../../utilites/paginate')
const db = require('../../../db')

// const db = db

// create main model 
const Customer_DataTable = db.customers
const Contact_number_Datatable = db.customer_contact_numbers
const Group_customer_Datatable = db.customer_group_customers
const Variant_customer_Datatable = db.customer_variant_customers
const Calender_event_Datatable = db.calender_events
const Relevent_document_Datatable = db.customer_relevent_documents
const variant_dataTable = db.customer_variants
const variant_value_dataTable = db.customer_variant_values

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

// 2. get all items

const All = async (req, res) => {
    
    let items = await Customer_DataTable.findAll({})
    res.status(200).send(items)
}
// 2. get customer items

const GetCustomer = async (req, res) => {
    const { Op } = require('sequelize');
    let searchKey = req.query.search_key;
    let query = {
        order: [['id', 'DESC']],
    };
    if (searchKey) {
        query.where = {
            [Op.or]: [
                { contact_number: { [Op.like]: `%${searchKey}%` } },
            ]
        };
    }
    let customer = await Customer_DataTable.findAndCountAll({
       
        where: {
            status: 1 
        },
        limit: 1,
        ...query,
    });
    res.status(200).send(customer?.rows)
}


// 2.1 get all data by paginate
const PaginateData = async (req, res) => {
    console.log("customer custoemr");
    const { Op } = require('sequelize');
    let searchKey = req.query.search_key;
    let query = {
        order: [['id', 'DESC']],
    };
    if (searchKey) {
        query.where = {
            [Op.or]: [
                { full_name: { [Op.like]: `%${searchKey}%` } },
                { email: { [Op.like]: `%${searchKey}%` } },
                { contact_number: { [Op.like]: `%${searchKey}%` } },
                { uuid: { [Op.like]: `%${searchKey}%` } },
            ]
        };
    }
    console.log('paginate query from controller', query);
    let items = await paginate(req, Customer_DataTable, parseInt(req.query.page_limit||10), query);
    res.status(200).send(items);
}

// 3. get single item

const get = async (req, res) => {
    
    try {
        let id = req.params.id
    let customer = await Customer_DataTable.findOne({ where: { id: id }})
    let contact_number = await Contact_number_Datatable.findOne({where: {customer_id: id}})
    let group_customer = await Group_customer_Datatable.findOne({where: {customer_id: id}})
    let variant_customer = await Variant_customer_Datatable.findOne({where: {customer_id: id}})
    let calender_event = await Calender_event_Datatable.findOne({where: {customer_id: id}})
    let relevent_document = await Relevent_document_Datatable.findOne({where: {customer_id: id}})

    res.status(200).json({customer,contact_number,group_customer,variant_customer,calender_event,relevent_document})
    } catch (error) {
        
    }
}


// 3. get single item

const getVariantCustomer = async (req, res) => {
    let id = req.params.id
    let item = await Customer_DataTable.findOne({ 
        where: { 
            id: id 
        }, 
        include: [
            {
                model: variant_dataTable,
                include: [variant_value_dataTable]
            }
        ]
    })
    res.status(200).send(item)
}


// 4. update items

const update = async (req, res) => {
    
    let id = req.body.id
    // let id = req.params.id
    const item = await Customer_DataTable.update(req.body, { where: { id: id }})
    res.status(200).send(item)
}

// 5. delete item

const destroy = async (req, res) => {
    
    let id = req.params.id
    await Customer_DataTable.destroy({ where: { id: id }})
    res.status(200).send('item is deleted !')
}

// 6. get published item

const getPublisheditem = async (req, res) => {

    const items = await Customer_DataTable.findAll({ where: { published: true }})
    res.status(200).send(items)
}



module.exports = {
    store,
    All,
    get,
    update,
    destroy,
    getPublisheditem,
    PaginateData,
    getVariantCustomer,
    GetCustomer
}
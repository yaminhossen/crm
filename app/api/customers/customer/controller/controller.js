const db = require('../../../db')

// const db = db

// create main model 
const Customer_DataTable = db.customers
const Contact_number_Datatable = db.customer_contact_numbers
const Group_customer_Datatable = db.customer_group_customers
const Variant_customer_Datatable = db.customer_variant_customer
const Calender_event_Datatable = db.calender_events
const Relevent_document_Datatable = db.customer_relevent_documents

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

// 3. get single item

const get = async (req, res) => {
    
    let id = req.params.id
    let customer = await Customer_DataTable.findOne({ where: { id: id }})
    let contact_number = await Contact_number_Datatable.findOne({where: {customer_id: id}})
    let group_customer = await Group_customer_Datatable.findOne({where: {customer_id: id}})
    let variant_customer = await Variant_customer_Datatable.findOne({where: {customer_id: id}})
    let calender_event = await Calender_event_Datatable.findOne({where: {customer_id: id}})
    let relevent_document = await Relevent_document_Datatable.findOne({where: {customer_id: id}})

    res.status(200).json({customer,contact_number,group_customer,variant_customer,calender_event,relevent_document})
}

// 4. update items

const update = async (req, res) => {
    
    let id = req.params.id
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
    getPublisheditem
}
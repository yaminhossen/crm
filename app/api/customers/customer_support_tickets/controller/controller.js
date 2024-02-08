const db = require('../../../db')

// const db = db

// create main model 
const support_ticket_table = db.customer_support_tickets

// main works

// 1. create item

const store = async (req, res) => {

    let info = {
        customer_id: req.body.customer_id,
        ticket_uuid: req.body.ticket_uuid,
        subject: req.body.subject,
        description: req.body.description,
        priority: req.body.priority,
        assigned_to: req.body.assigned_to
    }

    const item = await support_ticket_table.create(info)
    res.status(200).send(item)

}

// 2. get all items

const All = async (req, res) => {
    
    let items = await support_ticket_table.findAll({})
    res.status(200).send(items)
}

// 3. get single item

const get = async (req, res) => {
    
    let id = req.params.id
    let item = await support_ticket_table.findOne({ where: { id: id }})
    res.status(200).send(item)
}

// 3. get all support ticket by user

const get_support_ticket = async (req, res) => {
    
    let id = req.params.userid
    let item = await support_ticket_table.findAll({ where: { assigned_to: id }})
    res.status(200).send(item)
}

// 4. update items

const update = async (req, res) => {
    
    let id = req.params.id
    const item = await support_ticket_table.update(req.body, { where: { id: id }})
    res.status(200).send(item)
}

// 5. delete item

const destroy = async (req, res) => {
    
    let id = req.params.id
    await support_ticket_table.destroy({ where: { id: id }})
    res.status(200).send('item is deleted !')
}

// 6. get published item

const getPublisheditem = async (req, res) => {

    const items = await support_ticket_table.findAll({ where: { published: true }})
    res.status(200).send(items)
}



module.exports = {
    store,
    All,
    get,
    update,
    destroy,
    getPublisheditem,
    get_support_ticket
}
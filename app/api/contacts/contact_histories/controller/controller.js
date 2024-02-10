const db = require('../../../db')

// const db = db

// create main model 
const history_dataTable = db.contact_histories
const crm_contact_dataTable = db.crm_contact_numbers
const history_feedback_dataTable = db.contact_history_feedbacks
const history_reason_dataTable = db.contact_reasons
// main works

// 1. create item

const store = async (req, res) => {

    let info = {
        contact_number_id: req.body.contact_number_id,
        customer_id: req.body.customer_id,
        date: req.body.date,
        contact_type: req.body.contact_type,
        note: req.body.note,
        creator: req.body.creator
    }

    const item = await history_dataTable.create(info)
    res.status(200).send(item)

}

// 2. get all items

const All = async (req, res) => {

    let items = await history_dataTable.findAll({})
    res.status(200).send(items)
}

// 3. get single item

const get = async (req, res) => {

    let id = req.params.id
    let item = await history_dataTable.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: crm_contact_dataTable,
            },
            {
                model: history_feedback_dataTable,
            },
            {
                model: history_reason_dataTable,
            }
        ]
    })
    res.status(200).send(item)
}

// 4. update items

const update = async (req, res) => {

    let id = req.params.id
    const item = await history_dataTable.update(req.body, { where: { id: id } })
    res.status(200).send(item)
}

// 5. delete item

const destroy = async (req, res) => {

    let id = req.params.id
    await history_dataTable.destroy({ where: { id: id } })
    res.status(200).send('item is deleted !')
}

// 6. get published item

const getPublisheditem = async (req, res) => {

    const items = await history_dataTable.findAll({ where: { published: true } })
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
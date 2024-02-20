const { paginate } = require('../../../../utilites/paginate')
const db = require('../../../db')

// const db = db

// create main model 
const DataTable = db.task_users
const Tasks = db.tasks
const Users = db.users

// main works

// 1. create item

const store = async (req, res) => {
    let info = {
        user_id: req.body.user_id,
        task_id: req.body.task_id
    }
    const item = await DataTable.create(info)
    res.status(200).send(item)
}

// 2. get all items

const All = async (req, res) => {
    let items = await DataTable.findAll({})
    res.status(200).send(items)
}

// 2.1 get all data by paginate
const PaginateData = async (req, res) => {
    const { Op } = require('sequelize');
    let searchKey = req.query.search_key;
    let query = {
        order: [['id', 'DESC']],
    };
    if (searchKey) {
        query.where = {
            [Op.or]: [
                { task_id: { [Op.like]: `%${searchKey}%` } },
                { user_id: { [Op.like]: `%${searchKey}%` } },
            ]
        };
    }
    let items = await paginate(req, DataTable, parseInt(req.query.page_limit||10), query);
    res.status(200).send(items);
}

// 3. get single item

const get = async (req, res) => {
    let id = req.params.id
    let item = await DataTable.findOne({ where: { id: id } })
    res.status(200).send(item)
}

// 3. get user task item

const gettask = async (req, res) => {
    let id = req.params.userid;
    let item = await DataTable.findAll({
        where: {
            user_id: id
        },
        include: [Tasks, Users]
    })
    res.status(200).send(item)
}

// 4. update items

const update = async (req, res) => {

    let id = req.body.id
    // let id = req.params.id
    const item = await DataTable.update(req.body, { where: { id: id } })
    res.status(200).send(item)
}

// 5. delete item

const destroy = async (req, res) => {

    let id = req.params.id
    await DataTable.destroy({ where: { id: id } })
    res.status(200).send('item is deleted !')
}

// 6. get published item

const getPublisheditem = async (req, res) => {

    const items = await DataTable.findAll({ where: { published: true } })
    res.status(200).send(items)
}



module.exports = {
    store,
    All,
    get,
    update,
    destroy,
    getPublisheditem,
    gettask,
    PaginateData
}
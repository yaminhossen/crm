const { paginate } = require('../../../../utilites/paginate')
const db = require('../../../db')

// const db = db

// create main model 
const DataTable = db.user_infos

// main works

// 1. create item

const store = async (req, res) => {

    let info = {
        user_id: req.body.user_id,
        first_name: req.body.first_name,
        phone_number: req.body.phone_number,
        last_name: req.body.last_name,
        designation: req.body.designation,
        date_of_birth: req.body.date_of_birth
    }

    const item = await DataTable.create(info)
    res.status(200).send(item)

}

// 2. get all items

const All = async (req, res) => {
    
    let items = await DataTable.findAll({})
    res.status(200).send(items)
}

const PaginateData = async (req, res) => {
    const { Op } = require('sequelize');
    let searchKey = req.query.search_key;
    let query = {
        order: [['id', 'DESC']],
    };
    if (searchKey) {
        query.where = {
            [Op.or]: [
                { user_id: { [Op.like]: `%${searchKey}%` } },
                { first_name: { [Op.like]: `%${searchKey}%` } },
                { phone_number: { [Op.like]: `%${searchKey}%` } },
                { last_name: { [Op.like]: `%${searchKey}%` } },
                { designation: { [Op.like]: `%${searchKey}%` } },
            ]
        };
    }
    let items = await paginate(req, DataTable, parseInt(req.query.page_limit||10), query);
    res.status(200).send(items);
}

// 3. get single item

const get = async (req, res) => {
    
    let id = req.params.id
    let item = await DataTable.findOne({ where: { id: id }})
    res.status(200).send(item)
}
// 3. get user info item

const getinfo = async (req, res) => {
    
    let id = req.params.userid
    console.log("user id from info", id);
    let item = await DataTable.findOne({ where: { user_id: id }})
    res.status(200).send(item)
}

// 4. update items

const update = async (req, res) => {
    
    let id = req.params.id
    const item = await DataTable.update(req.body, { where: { id: id }})
    res.status(200).send(item)
}

// 5. delete item

const destroy = async (req, res) => {
    
    let id = req.params.id
    await DataTable.destroy({ where: { id: id }})
    res.status(200).send('item is deleted !')
}

// 6. get published item

const getPublisheditem = async (req, res) => {

    const items = await DataTable.findAll({ where: { published: true }})
    res.status(200).send(items)
}



module.exports = {
    store,
    All,
    get,
    update,
    destroy,
    getPublisheditem,
    getinfo,
    PaginateData
}
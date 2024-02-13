const { paginate } = require('../../../../utilites/paginate')
const db = require('../../../db')
// const db = db

// create main model 
const DataTable = db.users
const infoDataTable = db.user_infos
const designationDataTable = db.user_Designations
const workUserDataTable = db.user_work_users
const workDataTable = db.user_works
const departmentDataTable = db.user_work_departments

// main works

// 1. create item

const store = async (req, res) => {

    let info = {
        user_uid: req.body.user_uid,
        user_name: req.body.user_name,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
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
                { user_name: { [Op.like]: `%${searchKey}%` } },
                { email: { [Op.like]: `%${searchKey}%` } },
                { role: { [Op.like]: `%${searchKey}%` } },
                { user_uid: { [Op.like]: `%${searchKey}%` } },
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

// 3. get single item

const get_full_details = async (req, res) => {

    let id = req.params.id
    let user_infos = await infoDataTable.findOne({ where: { user_id: id } })
    let user_work_users = await workUserDataTable.findOne({ where: { user_id: id } })
    let user_designations = await designationDataTable.findOne({ where: { user_id: id } })
    let user = await DataTable.findOne({ where: { id: id } })
    let user_works = await workDataTable.findOne({ where: { id: user_work_users.work_id } })
    let user_work_department = await departmentDataTable.findOne({ where: { id: user_work_users.department_id } })
    res.status(200).json({
        user_infos,
        user_designations,
        user_work_users,
        user,
        user_works,
        user_work_department
    })
}

// 4. update items

const update = async (req, res) => {

    let id = req.params.id
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
    PaginateData,
    get,
    update,
    destroy,
    getPublisheditem,
    get_full_details,
}
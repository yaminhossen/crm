const { paginate } = require('../../../../utilites/paginate')
const db = require('../../../db')

// const db = db

// create main model 
const DataTable = db.user_Designations
const User_dataTable = db.users

// main works

// 1. create item

const store = async (req, res) => {

    let info = {
        user_id: req.body.user_id,
        designation: req.body.designation,
        description: req.body.description
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
        include: [
            {
                model: User_dataTable
            },
        ]
    };
    if (searchKey) {
        query.where = {
            [Op.or]: [
                { user_id: { [Op.like]: `%${searchKey}%` } },
                { designation: { [Op.like]: `%${searchKey}%` } },
                { description: { [Op.like]: `%${searchKey}%` } },
            ]
        };
    }
    let items = await paginate(req, DataTable, parseInt(req.query.page_limit||10), query);
    res.status(200).send(items);
}

// 3. get single item by id

const get = async (req, res) => {
    
    let id = req.params.id
    let item = await DataTable.findOne({ where: { id: id }})
    res.status(200).send(item)
}

// 3. get single item by user_id

const get_designation = async (req, res) => {
    
    let id = req.params.userid
    let item = await DataTable.findOne({ where: { user_id: id }})
    res.status(200).send(item)
}

// 4. update items

const update = async (req, res) => {
    
    // let id = req.params.id
    let id = req.body.id
    const item = await DataTable.update(req.body, { where: { id: id }})
    res.status(200).send(item)
}

// // 5. delete item

// const destroy = async (req, res) => {
    
//     let id = req.params.id
//     await DataTable.destroy({ where: { id: id }})
//     res.status(200).send('item is deleted !')
// }

// copy...
// 5. delete item
const destroy = async (req, res) => {

    // Find the model data by ID
    let item = await DataTable.findOne({ where: { id: req.body.id } })
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
    get_designation,
    PaginateData
}
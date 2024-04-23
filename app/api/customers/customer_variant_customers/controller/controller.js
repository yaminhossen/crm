const { paginate } = require('../../../../utilites/paginate')
const db = require('../../../db')

// const db = db

// create main model 
const DataTable = db.customer_variant_customers
const Customer_DataTable = db.customers
const Variant_value_DataTable = db.customer_variant_values
const Variant_DataTable = db.customer_variants

// main works

// 1. create item

const store = async (req, res) => {

    let info = {
        customer_id: req.body.customer_id,
        variant_id: req.body.variant_id,
        variant_value_id: req.body.variant_value_id
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
        attributes: ['*',['id','rid']],
        order: [['id', 'DESC']],
        include: [
            {
                model: Customer_DataTable
            },
            {
                model: Variant_DataTable
            },
            {
                model: Variant_value_DataTable
            },
        ]
    };
    if (searchKey) {
        query.where = {
            [Op.or]: [
                { customer_id: { [Op.like]: `%${searchKey}%` } },
                { variant_id: { [Op.like]: `%${searchKey}%` } },
                { variant_value_id: { [Op.like]: `%${searchKey}%` } },
            ]
        };
    }
    let items = await paginate(req, DataTable, parseInt(req.query.page_limit||10), query);
    res.status(200).send(items);
}

// 3. get single item

const get = async (req, res) => {
    
    let id = req.params.id
    let item = await DataTable.findOne({ 
        where: { id: id },
        include: [
            {
                model: Customer_DataTable
            },
            {
                model: Variant_DataTable
            },
            {
                model: Variant_value_DataTable
            },
        ]
    
    })
    res.status(200).send(item)
}

// 4. update items

const update = async (req, res) => {
    
    let id = req.body.id
    // console.log('body', req.body);
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
    PaginateData
}
const { paginate } = require('../../../../utilites/paginate')
const db = require('../../../db')

// const db = db

// create main model 
const customer_variant_datatable = db.customer_variants
const variant_values_datatable = db.customer_variant_values
const variant_customer_datatable = db.customer_variant_customers

// main works

// 1. create item

const store = async (req, res) => {

    let info = {
        title: req.body.title
    }

    const item = await customer_variant_datatable.create(info)
    res.status(200).send(item)

}

// 2. get all items

const All = async (req, res) => {
    
    let items = await customer_variant_datatable.findAll({})
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
                { title: { [Op.like]: `%${searchKey}%` } },
            ]
        };
    }
    let items = await paginate(req, customer_variant_datatable, parseInt(req.query.page_limit||10), query);
    res.status(200).send(items);
}

// // 3. get single item

// const get = async (req, res) => {
    
//     let id = req.params.id
//     let item = await customer_variant_datatable.findOne({ 
//         where: { 
//             id: id 
//         }, 
//         include: [
//             {
//                 model: db.variant_values_datatable,
//             }
//         ]
//     })
//     res.status(200).json(item)
// }


// 3. get single item

const get = async (req, res) => {
    
    let id = req.params.id
    let customer_variant = await customer_variant_datatable.findOne({ where: { id: id }})
    let customer_variant_value = await variant_values_datatable.findAll({ where: { variant_id: id }})
    let customer_variant_customer = await variant_customer_datatable.findAll({ where: { variant_id: id }})
    res.status(200).json({customer_variant,customer_variant_value,customer_variant_customer})
}

// 4. update items

const update = async (req, res) => {
    
    let id = req.params.id
    const item = await customer_variant_datatable.update(req.body, { where: { id: id }})
    res.status(200).send(item)
}

// 5. delete item

const destroy = async (req, res) => {
    
    let id = req.params.id
    await customer_variant_datatable.destroy({ where: { id: id }})
    res.status(200).send('item is deleted !')
}

// 6. get published item

const getPublisheditem = async (req, res) => {

    const items = await customer_variant_datatable.findAll({ where: { published: true }})
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
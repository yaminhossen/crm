const { paginate } = require('../../../../utilites/paginate')
const db = require('../../../db')

// const db = db

// create main model 
const variant_values_datatable = db.customer_variant_values
const variant_customer_datatables = db.customer_variant_customers
const Variant_dataTable = db.customer_variants

// main works

// 1. create item

const store = async (req, res) => {

    let info = {
        variant_id: req.body.variant_id,
        title: req.body.title
    }

    const item = await variant_values_datatable.create(info)
    res.status(200).send(item)

}

// 2. get all items

const All = async (req, res) => {

    let items = await variant_values_datatable.findAll({})
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
                model: Variant_dataTable
            },
        ]
    };
    if (searchKey) {
        query.where = {
            [Op.or]: [
                { title: { [Op.like]: `%${searchKey}%` } },
                { variant_id: { [Op.like]: `%${searchKey}%` } },
            ]
        };
    }
    let items = await paginate(req, variant_values_datatable, parseInt(req.query.page_limit || 10), query);
    res.status(200).send(items);
}
// 3. get single item

const get = async (req, res) => {
    let id = req.params.id
    let item = await variant_values_datatable.findOne({ 
        where: { id: id },
        include: [
            {
                model: Variant_dataTable
            },
        ]
    })
    res.status(200).send(item)
    
   /* try {
    let id = req.params.id
    let customer_variant_value = await variant_values_datatable.findOne({ where: { id: id }})
    let customer_variant_customer = await variant_customer_datatables.findOne({ where: { variant_value_id: id }})
    res.status(200).json({customer_variant_value,customer_variant_customer})
   } catch (error) {
    
   } */
}

// 4. update items

const update = async (req, res) => {
    
    let id = req.body.id
    // let id = req.params.id
    const item = await variant_values_datatable.update(req.body, { where: { id: id }})
    res.status(200).send(item)
}

// 5. delete item

// const destroy = async (req, res) => {

//     let id = req.params.id
//     await variant_values_datatable.destroy({ where: { id: id }})
//     res.status(200).send('item is deleted !')
// }
// 5. delete item
const destroy = async (req, res) => {

    // Find the model data by ID
    let item = await variant_values_datatable.findOne({ where: { id: req.body.id } })
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

    const items = await variant_values_datatable.findAll({ where: { published: true } })
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
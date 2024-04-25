const { paginate } = require('../../../../utilites/paginate')
const db = require('../../../db')

// const db = db

// create main model 
const DataTable = db.tasks
const TaskUsers = db.task_users
const TaskVariants= db.task_variants
const TaskVariantValues = db.task_variant_values
const TaskVariantTask = db.task_variant_tasks
const Users = db.users

// main works

// 1. create item

const store = async (req, res) => {

    let info = {
        title: req.body.title,
        description: req.body.description,
        end_time: req.body.end_time
    }
    console.log("req body from task store", req.body);
    const item = await DataTable.create(info)
    let task_info = {
        task_id: item.id,
        user_id:req.body.user
    }
    const task_user = await TaskUsers.create(task_info)
    let variant_value = await TaskVariantValues.findOne({ where: { id: req.body.task_variant_value_id } })

    let variant = await TaskVariants.findOne({ where: { id: variant_value.task_variant_id } })

    let task_variant_task_info = {
        task_id: item.id,
        task_variant_value_id:req.body.task_variant_value_id,
        variant_id: variant.id
    }
    const task_variant_task = await TaskVariantTask.create(task_variant_task_info)
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
                { title: { [Op.like]: `%${searchKey}%` } },
                { description: { [Op.like]: `%${searchKey}%` } },
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
        where: { 
            id: id 
        }, 
        include: [
            // {
            //     model: TaskUsers,
            //     include: [Users]
            // },
            // {
            //     model: TaskVariants,
            //     include: [TaskVariantValues]
            // }
        ]
    })
    res.status(200).send(item)
}

// 4. update items

const update = async (req, res) => {
    
    let id = req.body.id
    let info = {
        title: req.body.title,
        description: req.body.description,
        end_time: req.body.end_time
    }
    await DataTable.update(info, { where: { id: id }})
    // const item = await DataTable.findOne({ where: { id: id }})
    // console.log('item id ', item);
    let task_info = {
        task_id: id,
        user_id:req.body.user
    }
    const task_user = await TaskUsers.update(task_info, { where: { task_id: id }})
    // 
    let variant_value = await TaskVariantValues.findOne({ where: { id: req.body.task_variant_value_id } })
    let variant = await TaskVariants.findOne({ where: { id: variant_value.task_variant_id } })
    let task_variant_task_info = {
        task_id: id,
        task_variant_value_id:req.body.task_variant_value_id,
        variant_id: variant.id
    }
    const task_variant_task = await TaskVariantTask.update(task_variant_task_info, { where: { task_id: id }})
    res.status(200).send(task_variant_task)
}

// // 5. delete item

// const destroy = async (req, res) => {
    
//     let id = req.params.id
//     await DataTable.destroy({ where: { id: id }})
//     res.status(200).send('item is deleted !')
// }
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
    PaginateData
}
const { paginate } = require('../../../../utilites/paginate')
const db = require('../../../db')
var fs = require('fs-extra')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

// const db = db

// create main model 
const Customer_DataTable = db.customers
const Contact_number_Datatable = db.customer_contact_numbers
const group_Datatable = db.customer_groups
const reason_Datatable = db.contact_reasons
const history_reason_Datatable = db.contact_history_reasons
const user_Datatable = db.users
const group_customer_Datatable = db.customer_group_customers
const Variant_customer_Datatable = db.customer_variant_customers
const Calender_event_Datatable = db.calender_events
const Relevent_document_Datatable = db.customer_relevent_documents
const variant_dataTable = db.customer_variants
const variant_value_dataTable = db.customer_variant_values
const contact_history_dataTable = db.contact_histories
const contact_history_feedback_dataTable = db.contact_history_feedbacks
const lead_dataTable = db.leads
const contact_reason_dataTable = db.contact_reasons
const contact_appointment_dataTable = db.contact_appointments
const contact_appointment_reason_dataTable = db.contact_appointment_reasons
const cvc_dataTable = db.customer_variant_customers
const crm_contact_num_dataTable = db.crm_contact_numbers

// main works

// 1. create item

const store = async (req, res) => {

    let info = {
        uuid: req.body.uuid,
        full_name: req.body.full_name,
        email: req.body.email,
        contact_number: req.body.contact_number,
        address: req.body.address
    }

    const item = await Customer_DataTable.create(info)
    res.status(200).send(item)

}
const storeCRM = async (req, res) => {
    let ccn = req.body.customer_contact_number;
    
    for (const element of ccn) {
        let ccnInfo = {
            customer_id: req.body.id,
            details: element,
            
        }
        // const cvnt = await Contact_number_Datatable.create(ccnInfo)
    }
    let customer_variants = req.body.customer_variants;
    let customer_id = req.body.id;
    
    for (let key in customer_variants) {
        let id = key.split('_')[1]
        let cvcInfo = {
            variant_id: id,
            variant_value_id: customer_variants[key],
            customer_id: customer_id,
        }
        // const cvct = await cvc_dataTable.create(cvcInfo)
    }
    console.log('crm contact number', req.body.crm_contact_number);
    let contact_type = {
        contact_type: req.body.contact_type,
        contact_number_id: req.body.crm_contact_number,
        customer_id: customer_id,
        date: req.body.date,
        note: req.body.contact_notes,


    }
    // const contactt = await contact_history_dataTable.create(contact_type)
    console.log('contact history immediate',req.body.contact_number );
    let customer = {
        full_name: req.body.full_name,
        contact_number: req.body.contact_number,

    }

    // contact history feedback complete
    let feedback = {
        notes: req.body.feedback,
        date: req.body.date,
        // feedback_type: req.body.feedback_type,
        // contact_history_id: contactt.dataValues.id,
    }
    // const feedbackt = await contact_history_feedback_dataTable.create(feedback)

    // contact history reason complete
    let contact_reasons = req.body.contact_reason;
    console.log('customer reason', contact_reasons);
    for (let key of contact_reasons) {
        console.log('contact history reaosn id ', key);
        let history_reason = {
            reason_id: key,
            // contact_histories_id: contactt.dataValues.id,
        }
        // const chrt = await history_reason_Datatable.create(history_reason)
    }

    let customer_group_customer = req.body.customer_group_customer;
    if(customer_group_customer.length){
        for (const element of customer_group_customer) {
            let group = {
                customer_group_id: element,
                customer_id: customer_id,
    
            }
            // const groupt = await group_customer_Datatable.create(group)
        }
    }
    
    // calender event complete
    let calender_event = {
        customer_id: customer_id,
        event_date: req.body.calender_event_date,
        event_type: req.body.calender_event_type,
        event_description: req.body.calender_event_description,
        meet_link: req.body.calender_event_meet_link,

    }

    // const event = await Calender_event_Datatable.create(calender_event)

    // contact appointments complete
    let contact_appointment = {
        date: req.body.appointment_date,
        contact_type: req.body.appointment_contact_type,
        note: req.body.appointment_note,
        customer_id: customer_id,
        contact_number_id: customer_id,

    }
    // const cappointmentt = await contact_appointment_dataTable.create(contact_appointment)

    
    // contact appointment reason complete
    console.log('contact appointment reason', contact_reasons);
    for (let key of contact_reasons) {
        console.log('contact history reaosn id ', key);
        let appointment_reason = {
            contact_reason_id: key,
            // contact_appointment_id: cappointmentt.dataValues.id,
        }
        // const cart = await contact_appointment_reason_dataTable.create(appointment_reason)
    }

    let appointment_reason = {
        appointment_reason: req.body.appointment_reason,

    }
    let lead = {
        customer_id: customer_id,
        lead_status: req.body.lead_status,
        lead_source: req.body.lead_source,
        qualification_notes: req.body.lead_qualification_note,
        follow_up_date: req.body.follow_up_date,
        assigned_to: req.body.assigned_to

    }
   
    console.log('document body ', req.body);
    console.log('document file ', req.files);
    console.log('document file 3 ', req.files?.docu_3);
    let files = req.files;

    const upload_files = (file, id) => {
        let file_name = parseInt(Math.random() * 1000) + id + file.name;
        const path = appDir + "/public/uploads/posts/" + file_name;
        fs.move(file.path, path, function (err) {
            if (err) return console.error(err)
            console.log("success!")
        })
        photo_path = "uploads/posts/" + file_name;
        return photo_path;
    }

    var photo_path = "";

        if (files?.docu_1) {
            photo_path = upload_files(files?.docu_1, customer_id);
            console.log('form photo_path', photo_path);
            if(files?.docu_1?.name){
                let document = {
                    document_path: photo_path,
                    customer_id: customer_id,
                }
                const crdt = await Relevent_document_Datatable.create(document)
            }
        }
        if (files?.docu_2) {
            photo_path = upload_files(files?.docu_2, customer_id);
            console.log('form photo_path', photo_path);
            if(files?.docu_2?.name){
                let document2 = {
                    document_path: photo_path,
                    customer_id: customer_id,
                }
                const crdt = await Relevent_document_Datatable.create(document2)
            }
        }
        if (files?.docu_3) {
            photo_path = upload_files(files?.docu_3, customer_id);
            console.log('form photo_path', photo_path);
            if(files?.docu_3?.name){
                let document3 = {
                    document_path: photo_path,
                    customer_id: customer_id,
                }
                const crdt = await Relevent_document_Datatable.create(document3)
            }
        }

   

    res.status(200).send('ok')

}

// 2. get all items

const All = async (req, res) => {

    let items = await Customer_DataTable.findAll({})
    res.status(200).send(items)
}

// 2. get customer items

const GetCustomer = async (req, res) => {
   try {
    const { Op } = require('sequelize');
    let searchKey = req.query.search_key;
    // console.log("search key", searchKey);
    let query = {
        // order: [['id', 'DESC']],
    };
    if (searchKey.length) {
        query.where = {
            [Op.or]: [
                { contact_number: { [Op.like]: `${searchKey}%` } },
            ]
        };
        let customer = await Customer_DataTable.findOne({
       
            where: {
                status: 1 
            },
            // limit: 1,
            ...query,
        });
        // console.log('customer query',query);
        let cu_id = customer?.dataValues?.id;
    
        let Contact_history = await contact_history_dataTable.findOne({where: {customer_id: cu_id}})
    
        let ch_id = Contact_history.dataValues.id;
        // console.log("cusotmer his id ", ch_id);
    
        let Contact_history_feedback = await contact_history_feedback_dataTable.findOne({where: {contact_history_id: ch_id}})
    
        // console.log("cusotmer his feedback id ", Contact_history_feedback.dataValues);
        let newUser = customer
        let newFeedback = Contact_history_feedback.dataValues
        // console.log('newFeedback1', customer);
        // console.log('newFeedback', newFeedback);
       
       
        let users = 'kkkk'
        res.status(200).json({
            newUser,
            newFeedback,
            Contact_history,
            users
            // item
        })
    }
    if(searchKey.length == 0){
       let newUser =[]
       let newFeedback = []
       let Contact_history =[]
       let users = []
        res.status(200).json({
            newUser,
            newFeedback,
            Contact_history,
            users
            // item
            // item
        })
    }
   
  
   } catch (error) {
    
   }
}

// 3. get single item

const GetDependancy = async (req, res) => {
    let users = []
    let items = []
    let reasons = []
    let variants = []
    let variant_values = []
    let crm_contact_nums = []
    try {
        users = await user_Datatable.findAll({
            where: {
                role: 'employee'
            }
        });
        items = await group_Datatable.findAll({});
        reasons = await reason_Datatable.findAll({});
        variants = await variant_dataTable.findAll({});
        variant_values = await variant_value_dataTable.findAll({});
        crm_contact_nums = await crm_contact_num_dataTable.findAll({});

    } catch (error) {
        
    }
    res.status(200).json({
        users,
        items,
        reasons,
        variants,
        variant_values,
        crm_contact_nums,
    })
}

/* // 2. get customer items

const GetCustomer2 = async (req, res) => {
   try {
    const { Op } = require('sequelize');
    let searchKey = req.query.search_key;
    console.log("search key", searchKey);
    let query = {
        // order: [['id', 'DESC']],
    };
    if (searchKey) {
        query.where = {
            [Op.or]: [
                { contact_number: { [Op.like]: `${searchKey}%` } },
            ]
        };
    }
    let customer = await Customer_DataTable.findOne({
       
        where: {
            status: 1 
        },
        // limit: 1,
        ...query,
    });
    console.log('customer query',customer);
    let cu_id = customer?.dataValues?.id;
    // console.log('customer id', cu_id);
    // let item = await Customer_DataTable.findOne({ 
    //     where: { 
    //         id: cu_id 
    //     }, 
    //     include: [
    //         {
    //             model: variant_dataTable,
    //             include: [variant_value_dataTable]
    //         },
    //         {
    //             model: group_Datatable,
    //             include: [group_customer_Datatable]
    //         }
    //     ]
    // })
    let Contact_history = await contact_history_dataTable.findOne({where: {customer_id: cu_id}})

    let ch_id = Contact_history.dataValues.id;
    // console.log("cusotmer his id ", ch_id);

    let Contact_history_feedback = await contact_history_feedback_dataTable.findOne({where: {contact_history_id: ch_id}})

    // console.log("cusotmer his feedback id ", Contact_history_feedback.dataValues);
    let newUser = customer
    let newFeedback = Contact_history_feedback.dataValues
    console.log('newFeedback1', customer);
    // console.log('newFeedback', newFeedback);
    res.status(200).json({
        newUser,
        newFeedback,
        Contact_history,
        // item
    })
   } catch (error) {
    
   }
} */


// 2.1 get all data by paginate
const PaginateData = async (req, res) => {
    console.log("customer customer");
    const { Op } = require('sequelize');
    let searchKey = req.query.search_key;
    let query = {
        order: [['id', 'DESC']],
    };
    if (searchKey) {
        query.where = {
            [Op.or]: [
                { full_name: { [Op.like]: `%${searchKey}%` } },
                { email: { [Op.like]: `%${searchKey}%` } },
                { contact_number: { [Op.like]: `%${searchKey}%` } },
                { uuid: { [Op.like]: `%${searchKey}%` } },
            ]
        };
    }
    let items = await paginate(req, Customer_DataTable, parseInt(req.query.page_limit || 10), query);
    res.status(200).send(items);
}

// 3. get single item

const get = async (req, res) => {

    let id = req.params.id
    let customer = await Customer_DataTable.findOne({ where: { id: id } })
    let contact_number = await Contact_number_Datatable.findOne({ where: { customer_id: id } })
    let group_customer = await Group_customer_Datatable.findOne({ where: { customer_id: id } })
    let variant_customer = await Variant_customer_Datatable.findOne({ where: { customer_id: id } })
    let calender_event = await Calender_event_Datatable.findOne({ where: { customer_id: id } })
    let relevent_document = await Relevent_document_Datatable.findOne({ where: { customer_id: id } })

    res.status(200).json({ customer, contact_number, group_customer, variant_customer, calender_event, relevent_document })
    
    try {
        let id = req.params.id
    let customer = await Customer_DataTable.findOne({ where: { id: id }})
    let contact_number = await Contact_number_Datatable.findOne({where: {customer_id: id}})
    let group_customer = await Group_customer_Datatable.findOne({where: {customer_id: id}})
    let variant_customer = await Variant_customer_Datatable.findOne({where: {customer_id: id}})
    let calender_event = await Calender_event_Datatable.findOne({where: {customer_id: id}})
    let relevent_document = await Relevent_document_Datatable.findOne({where: {customer_id: id}})

    res.status(200).json({customer,contact_number,group_customer,variant_customer,calender_event,relevent_document})
    } catch (error) {
        
    }
}
// 3. get2 single item

const get2 = async (req, res) => {
    let id = req.params.id
    let item = await Customer_DataTable.findOne({ 
        where: { 
            id: id 
        }, 
        include: [
            {
                model: group_Datatable,
                include: [group_customer_Datatable]
            }
        ]
    })
    res.status(200).send(item)
   
}


// 3. get single item

const getVariantCustomer = async (req, res) => {
    let id = req.params.id
    let item = await Customer_DataTable.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: variant_dataTable,
                include: [variant_value_dataTable]
            }
        ]
    })
    res.status(200).send(item)
}


// 4. update items

const update = async (req, res) => {
    
    let id = req.body.id
    // let id = req.params.id
    const item = await Customer_DataTable.update(req.body, { where: { id: id }})
    res.status(200).send(item)
}

// 5. delete item

// const destroy = async (req, res) => {

//     let id = req.params.id
//     await Customer_DataTable.destroy({ where: { id: id }})
//     res.status(200).send('item is deleted !')
// }
// 5. delete item
const destroy = async (req, res) => {

    // Find the model data by ID
    let item = await Customer_DataTable.findOne({ where: { id: req.body.id } })
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

    const items = await Customer_DataTable.findAll({ where: { published: true } })
    res.status(200).send(items)
}



module.exports = {
    store,
    All,
    get,
    update,
    destroy,
    getPublisheditem,
    PaginateData,
    getVariantCustomer,
    GetCustomer,
    get2,
    GetDependancy,
    storeCRM,
}
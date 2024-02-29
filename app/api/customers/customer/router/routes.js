const express = require("express");
const controllers = require("../controller/controller");
const router = express.Router();

// router.use('/api/v1');

// router.get('s',async function(req,res,next){
//     let users = await userModel.find().exec();
//     return res.json({data:users});
// })

let prefix = 'customer'
router
    .get(`/${prefix}`, controllers.PaginateData)
    .get(`/customer-info`, controllers.GetCustomer)
    .get(`/all-user`, controllers.GetUser)
    // .get(`/${prefix}`, controllers.All)
    // .get(`/${prefix}`, controllers.All)
    .post(`/${prefix}/store`, controllers.store)
    .delete(`/${prefix}/delete/:id`, controllers.destroy)
    .post(`/${prefix}/update`, controllers.update)
    .get(`/${prefix}/variant/details/:id`, controllers.getVariantCustomer)
    .get(`/${prefix}/details/:id`, controllers.get);
    // .get(`/${prefix}/details/:id`, controllers.getVariantCustomer);


module.exports = () => router;
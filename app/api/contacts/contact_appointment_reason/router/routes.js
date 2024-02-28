const express = require("express");
const controllers = require("../controller/controller");
const router = express.Router();

// router.use('/api/v1');

// router.get('s',async function(req,res,next){
//     let users = await userModel.find().exec();
//     return res.json({data:users});
// })

let prefix = 'contact-appointment-reason'
router
    .get(`/${prefix}`, controllers.PaginateData)
    // .get(`/${prefix}`, controllers.All)
    .post(`/${prefix}/store`, controllers.store)
    .post(`/${prefix}/delete`, controllers.destroy)
    .post(`/${prefix}/update/:id`, controllers.update)
    .get(`/${prefix}/details/:id`, controllers.get);


module.exports = () => router;
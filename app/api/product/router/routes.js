const express = require("express");
const controllers = require("../controller/controller");
const router = express.Router();

// router.use('/api/v1');

// router.get('s',async function(req,res,next){
//     let users = await userModel.find().exec();
//     return res.json({data:users});
// })

let prefix = 'product'
router
    .get(`/${prefix}`, controllers.All)
    .post(`/${prefix}/store`, controllers.store)
    .delete(`/${prefix}/delete/:id`, controllers.destroy)
    // .post(`/${prefix}/restore`, controllers.restore)
    // .post(`/${prefix}/destroy`, controllers.destroy)
    .post(`/${prefix}/update/:id`, controllers.Update)
    .get(`/${prefix}/details/:id`, controllers.get);


module.exports = () => router;
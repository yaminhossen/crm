const express = require("express");
const controllers = require("../controller/controller");
const router = express.Router();

// router.use('/api/v1');

// router.get('s',async function(req,res,next){
//     let users = await userModel.find().exec();
//     return res.json({data:users});
// })

let prefix = 'customer-support-ticket'
router
    .get(`/${prefix}`, controllers.getAllProducts)
    .post(`/${prefix}/store`, controllers.store)
    .delete(`/${prefix}/delete/:id`, controllers.deleteProduct)
    // .post(`/${prefix}/restore`, controllers.restore)
    // .post(`/${prefix}/destroy`, controllers.destroy)
    .post(`/${prefix}/update/:id`, controllers.UpdateProduct)
    .get(`/${prefix}/details/:id`, controllers.getOneProduct);


module.exports = () => router;
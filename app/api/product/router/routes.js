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
    .get(`/${prefix}`, controllers.getAllProducts)
    .post(`/${prefix}/store`, controllers.addProduct)
    .post(`/${prefix}/delete`, controllers.deleteProduct)
    // .post(`/${prefix}/restore`, controllers.restore)
    // .post(`/${prefix}/destroy`, controllers.destroy)
    
    .post(`/${prefix}/update`, controllers.UpdateProduct)
    .get(`/${prefix}/details/:id`, controllers.getOneProduct);


module.exports = () => router;
const express = require("express");
const controllers = require("../controller/controller");
const router = express.Router();

// router.use('/api/v1');

// router.get('s',async function(req,res,next){
//     let users = await userModel.find().exec();
//     return res.json({data:users});
// })

let prefix = 'report'
router
   
    .get(`/${prefix}/per-month`, controllers.getUsersPerMonth)
    .get(`/${prefix}/all-customer`, controllers.findAllCustomers)
    .get(`/${prefix}/interested-customer`, controllers.findTotalInterestedCustomers)
    .get(`/${prefix}/pending-customer`, controllers.findPendingCustomers)
    .get(`/${prefix}/admitted-customer`, controllers.findTotalAdmittedCustomers)
    .get(`/${prefix}/upcoming-contact-list`, controllers.upComingContactList)
    .get(`/${prefix}/reject-customer-per-month`, controllers.rejectCustomerPerMonth)
    .post(`/${prefix}/store`, controllers.store)


module.exports = () => router;
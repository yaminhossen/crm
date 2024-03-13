const express = require("express");
const router = express.Router();
let server = null;
const db = require('../app/api/db')

// const blogRoutes = require("./partials/blog.routes");
// const emailRoutes = require("./partials/email.routes");
// const userRoutes = require("./partials/user.routes");
// const userRoleRoutes = require("./partials/user_role.routes");
const dashboardRoutes = require("./partials/dashboard.routes");
const websiteRoutes = require("./partials/website.routes");
const authRoutes = require("./partials/auth.routes");
const apiRoutes = require("./api.routes");
var jwt = require('jsonwebtoken');
const authMiddleware = require("../app/middlewares/authMiddleware");

const DataTable = db.users

module.exports = (mainserver) => {
    
    router.use(websiteRoutes(mainserver));
    router.use(authRoutes());
    router.use(dashboardRoutes());
    router.use(authMiddleware())
    router.use(apiRoutes());
    router.post("/api/logout", async function (req, res, next) {
        try {
            // console.log('req user logoutt',req?.user?.id);
            let id = req?.user?.id;
            let user = await DataTable.findOne({ where: { id: id } })
            req_token = req?.user?.token_salt;
            user_token = user.dataValues?.token_salt;
            if(req_token == user_token){

                console.log('this is simmiler', user.dataValues.token_salt);
                user.token_salt = null;
                await user.save();
                res.send('asdfj')
                // const item = await DataTable.update({token_salt: null}, { where: { id: id } })
            }
        } catch (error) {
            console.log('something form test auth');
            res.send('asdfj')
        }
    }, function (req, res, next){
        console.log('something form test auth');
        res.send('asdfj')
    })
    return router;

};

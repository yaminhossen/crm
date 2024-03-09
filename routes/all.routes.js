const express = require("express");
const router = express.Router();
let server = null;

// const blogRoutes = require("./partials/blog.routes");
// const emailRoutes = require("./partials/email.routes");
// const userRoutes = require("./partials/user.routes");
// const userRoleRoutes = require("./partials/user_role.routes");
const dashboardRoutes = require("./partials/dashboard.routes");
const websiteRoutes = require("./partials/website.routes");
const authRoutes = require("./partials/auth.routes");
const apiRoutes = require("./api.routes");
var jwt = require('jsonwebtoken');
module.exports = (mainserver) => {
    
    router.use(apiRoutes());
    router.use(websiteRoutes(mainserver));
    router.use(authRoutes());
    router.use(dashboardRoutes());
    router.get(`/test-auth`, async function (req, res, next) {
        console.log('middleware', req.headers.authorization);
        try {
            let check= await jwt.verify(req.headers.authorization.split(' ')[1],'yamin1234');
            console.log(check);
            next();
        } catch (error) {
            res.status(402).json('unathorized');
        }
    }, function (req, res, next){
        console.log('something form test auth');
        res.send('asdfj')
    })
    return router;

};

const db = require('../api/db')
var jwt = require('jsonwebtoken');

const DataTable = db.users
const isAuth = async (req, res, next) => {
    console.log('req header', req.headers?.authorization);
    let token = req.headers?.authorization?.split(' ');
    if (token && token[1]) {
        token = token[1];
        try {
            let auth_info = await jwt.verify(token, 'yamin1234');
            let user = await DataTable.findOne({ where: { id: auth_info.id } })
            if (user.token_salt == auth_info.token_salt) {
                req.user = auth_info;
                return next();
            } else {
                return res.status(401).json('unathorized');
            }

        } catch (error) {
            return res.status(401).json('unathorized');
        }
    } else {
        return res.status(401).json({
            message: 'unauthorized',
        })
    }
};

module.exports = () => isAuth;

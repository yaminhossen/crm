var jwt = require('jsonwebtoken');
const isAuth = async (req, res, next) => {
	console.log("cookies form middleware",req.headers);
	// let {token } = req.something;
    let token = req.headers?.authorization?.split(' ');
	if(token && token[1]){
        token = token[1];
		try {
            let auth_info = await jwt.verify(token,'yamin1234');
            req.user = auth_info;
            return next();
        } catch (error) {
            return res.status(401).json('unathorized');
        }
	} else {
        return res.status(401).json({
            message: 'un authorized',
        })
	}
};

module.exports = () => isAuth;

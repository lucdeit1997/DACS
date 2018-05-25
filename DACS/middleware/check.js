const { signPromise, verifyPromise } = require('../helpers/jwt');
const { session } = require('express-session');

const CheckPermission = function(req, res, next){
    const token  = req.session.token || req.body.token || req.params.token;
    console.log(token);
    if (!token) res.json({error: 'cannot_exist_token'});
    
    verifyPromise(token).then(result => {
        if (result.permission === 0) return res.json({message: 'permission_cannot_access'});
        req.userId = result.userId;
        next();
    }).catch(err => res.json({err: 'cannot_verify_token'}));
};

module.exports = CheckPermission;
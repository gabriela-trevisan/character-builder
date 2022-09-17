// const sql = require("./db.js");
const User = require("../models/users.model.js")

checkDuplicateEmailOrLogin = (req, res, next) => {

    // Email
    let exists_email = User.findByEmail(req.body.email)
    if($exists_email){
        return 'Email is already in use!';
    }

    // Login
    let exists_login = User.findByLogin(req.body.login)
    if($exists_login){
        return 'Login is already in use!';
    }

    return true;
};

// checkRolesExisted = (req, res, next) => {
//     if (req.body.roles) {
//         for (let i = 0; i < req.body.roles.length; i++) {
//             if (!ROLES.includes(req.body.roles[i])) {
//                 res.status(400).send({
//                     message: "Failed! Role does not exist = " + req.body.roles[i]
//                 });
//                 return;
//             }
//         }
//     }

//     next();
// };

const verifySignUp = {
    checkDuplicateEmailOrLogin: checkDuplicateEmailOrLogin
    // checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
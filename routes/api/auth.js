const bcrypt = require('bcrypt');
const uuid = require('uuid');
var router = require('express').Router();
const dal = require('../../services/p.auth.dal')
// const dal = require('../../services/m.auth.dal')

// api/auth/:id
// fetch the specific login by id
router.get('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/auth/:id GET ' + req.url);
    try {
        let aLogin = await dal.getLoginById(req.params.id); 
        if (aLogin.length === 0) {
            // log this error to an error log file.
            res.statusCode = 404;
            res.json({message: "Not Found", status: 404});
        }
        else
            res.json(aLogin);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
// reset the password
router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/auth PATCH ' + req.params.id);
    try {
        let aLogin = await dal.getLoginById(req.params.id); 
        if (aLogin.length === 0) {
            // log this error to an error log file.
            res.statusCode = 404;
            res.json({message: "Not Found", status: 404});
        } else {  
            try {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                await dal.patchLogin(req.params.id, aLogin.username, hashedPassword, aLogin.email);
                res.statusCode = 200;
                res.json({message: "OK", status: 200});
            } catch (error) {
                // log this error to an error log file.
                res.statusCode = 500;
                res.json({message: "Internal Server Error", status: 500});
            }
        }   
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
// delete the login 
router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/auth DELETE ' + req.params.id);
    try {
        await dal.deleteLogin(req.params.id);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
// // list the active api routes
// if(DEBUG) {
//     router.stack.forEach(function(r){
//         if (r.route && r.route.path){
//         console.log(r.route.path)
//         }
//     });
// }
module.exports = router;
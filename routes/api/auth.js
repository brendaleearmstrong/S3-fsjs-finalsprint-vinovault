const bcrypt = require('bcrypt');
const uuid = require('uuid');
var router = require('express').Router();
const dal = require('../../services/m.auth.dal');

router.get('/:id', async (req, res) => {
    console.log('Fetching login by id:', req.params.id);
    try {
        let aLogin = await dal.getLoginById(req.params.id);
        if (!aLogin) {
            res.statusCode = 404;
            res.json({message: "Not Found", status: 404});
        } else {
            res.json(aLogin);
        }
    } catch {
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

router.patch('/:id', async (req, res) => {
    console.log('Password reset for id:', req.params.id);
    try {
        let aLogin = await dal.getLoginById(req.params.id);
        if (!aLogin) {
            res.statusCode = 404;
            res.json({message: "Not Found", status: 404});
        } else {
            try {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                await dal.patchLogin(req.params.id, aLogin.username, hashedPassword, aLogin.email);
                res.statusCode = 200;
                res.json({message: "OK", status: 200});
            } catch (error) {
                res.statusCode = 500;
                res.json({message: "Internal Server Error", status: 500});
            }
        }
    } catch {
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

router.delete('/:id', async (req, res) => {
    console.log('Deleting login for id:', req.params.id);
    try {
        await dal.deleteLogin(req.params.id);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

module.exports = router;

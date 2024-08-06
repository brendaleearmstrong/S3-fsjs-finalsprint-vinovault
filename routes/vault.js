const express = require('express');
const router = express.Router();
const { setToken, authenticateJWT } = require('../services/authMiddleware');
const myEventEmitter = require('../services/logEvents');
const vaultService = require('../services/vaultService');

// Use the setToken middleware to set the JWT token from the session
router.use(setToken);

// Protect all vault routes with the authenticateJWT middleware
router.use(authenticateJWT);

router.post('/add/:wineId', async (req, res) => {
    try {
        const { wineId } = req.params;
        const { source } = req.body;
        const userId = req.user.email; // Assuming email is used as a user identifier

        console.log(`Adding wine to vault for user: ${userId}, wineId: ${wineId}, source: ${source}`);

        await vaultService.addWineToVault(userId, wineId, source);

        myEventEmitter.emit('event', 'post /vault/add', 'SUCCESS', `Wine ${wineId} added to vault for user ${userId}.`);
        res.json({ message: 'Wine added to vault successfully.' });
    } catch (error) {
        console.error('Error adding wine to vault:', error);
        myEventEmitter.emit('event', 'post /vault/add', 'ERROR', `Error adding wine to vault: ${error.message}`);
        res.status(500).json({ error: 'An error occurred while adding the wine to the vault.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const userId = req.user.email; // Assuming email is used as a user identifier

        console.log(`Fetching vault for user: ${userId}`);

        const vault = await vaultService.getVaultByUserId(userId);

        myEventEmitter.emit('event', 'get /vault', 'INFO', `Vault for user ${userId} was displayed.`);
        res.render('vault', { status: req.session.status, user: req.session.user, vault });
    } catch (error) {
        console.error('Error fetching vault:', error);
        myEventEmitter.emit('event', 'get /vault', 'ERROR', `Error fetching vault: ${error.message}`);
        res.status(500).render('error', { error: 'An error occurred while fetching the vault.' });
    }
});

module.exports = router;

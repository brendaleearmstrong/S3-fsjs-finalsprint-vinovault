const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { setToken, authenticateJWT } = require('../services/authMiddleware');
const myEventEmitter = require('../services/logEvents');
const vaultService = require('../services/vaultService');

// Use the setToken middleware to set the JWT token from the session
router.use(setToken);

// Protect all vault routes with the authenticateJWT middleware
router.use(authenticateJWT);

router.post('/add/:wineId', async (req, res) => {
    try {
        let { wineId } = req.params;
        const { source } = req.body;
        const userId = req.user.email; // Assuming email is used as a user identifier

        // If the source is MongoDB and wineId is a valid ObjectId string, convert it to ObjectId
        if (source === 'mongodb' && ObjectId.isValid(wineId)) {
            wineId = new ObjectId(wineId);
        }

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

router.delete('/remove/:wineId', async (req, res) => {
    try {
        const { wineId } = req.params;
        const userId = req.user.email;

        console.log(`Removing wine from vault for user: ${userId}, wineId: ${wineId}`);

        await vaultService.removeWineFromVault(userId, wineId);

        myEventEmitter.emit('event', 'delete /vault/remove', 'SUCCESS', `Wine ${wineId} removed from vault for user ${userId}.`);
        res.json({ message: 'Wine removed from vault successfully.' });
    } catch (error) {
        console.error('Error removing wine from vault:', error);
        myEventEmitter.emit('event', 'delete /vault/remove', 'ERROR', `Error removing wine from vault: ${error.message}`);
        res.status(500).json({ error: 'An error occurred while removing the wine from the vault.' });
    }
});

router.get('/export', async (req, res) => {
    try {
        const userId = req.user.email;

        console.log(`Exporting vault for user: ${userId}`);

        const vault = await vaultService.getVaultByUserId(userId);

        // Convert vault data to CSV format
        const csvData = convertToCSV(vault);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=wine_vault.csv');
        res.send(csvData);

        myEventEmitter.emit('event', 'get /vault/export', 'SUCCESS', `Vault exported for user ${userId}.`);
    } catch (error) {
        console.error('Error exporting vault:', error);
        myEventEmitter.emit('event', 'get /vault/export', 'ERROR', `Error exporting vault: ${error.message}`);
        res.status(500).json({ error: 'An error occurred while exporting the vault.' });
    }
});

function convertToCSV(vault) {
    const header = ['Name', 'Winery', 'Year', 'Region', 'Type', 'Price', 'Rating'];
    const rows = vault.map(wine => [
        wine.name,
        wine.winery,
        wine.year,
        wine.region,
        wine.type,
        wine.price,
        wine.rating
    ]);
    return [header, ...rows].map(row => row.join(',')).join('\n');
}

module.exports = router;
const { MongoClient } = require('mongodb');
const { Pool } = require('pg');
const myEventEmitter = require('./logEvents');

const mongoUri = process.env.MONGO_URI;
const postgresConfig = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
};

const pool = new Pool(postgresConfig);

async function getWineFromPostgres(wineId) {
    const query = 'SELECT * FROM wine WHERE wineid = $1';
    try {
        const result = await pool.query(query, [wineId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching wine from PostgreSQL:', error);
        myEventEmitter.emit('event', 'getWineFromPostgres', 'ERROR', `Error fetching wine from PostgreSQL: ${error.message}`);
        throw error;
    }
}

async function getWineFromMongo(wineId) {
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db('vinovault');
        const wine = await database.collection('wines').findOne({ _id: wineId });
        return wine;
    } catch (error) {
        console.error('Error fetching wine from MongoDB:', error);
        myEventEmitter.emit('event', 'getWineFromMongo', 'ERROR', `Error fetching wine from MongoDB: ${error.message}`);
        throw error;
    } finally {
        await client.close();
    }
}

async function addWineToVault(userId, wineId, source) {
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');

        const database = client.db('vinovault');
        const vaults = database.collection('vaults');

        let wine;
        if (source === 'postgres') {
            wine = await getWineFromPostgres(wineId);
        } else if (source === 'mongodb') {
            wine = await getWineFromMongo(wineId);
        }

        if (!wine) {
            throw new Error(`Wine with ID ${wineId} not found in ${source}`);
        }

        const update = {
            $push: { wines: { ...wine, source } }
        };

        await vaults.updateOne({ userId }, update, { upsert: true });

        myEventEmitter.emit('event', 'addWineToVault', 'SUCCESS', `Wine ${wineId} added to vault for user ${userId}.`);
        console.log(`Wine ${wineId} added to vault for user ${userId}`);
    } catch (error) {
        console.error('Error adding wine to vault:', error);
        myEventEmitter.emit('event', 'addWineToVault', 'ERROR', `Error adding wine to vault: ${error.message}`);
        throw error;
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

async function getVaultByUserId(userId) {
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');

        const database = client.db('vinovault');
        const vaults = database.collection('vaults');

        const vault = await vaults.findOne({ userId });

        myEventEmitter.emit('event', 'getVaultByUserId', 'INFO', `Vault for user ${userId} was retrieved.`);
        console.log(`Vault for user ${userId} retrieved`);

        return vault ? vault.wines : [];
    } catch (error) {
        console.error('Error fetching vault:', error);
        myEventEmitter.emit('event', 'getVaultByUserId', 'ERROR', `Error fetching vault: ${error.message}`);
        throw error;
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

module.exports = {
    addWineToVault,
    getVaultByUserId,
};

import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    database: process.env.SQL_DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1);
    }
    console.log('Connected to the database.');
});

connection.on('error', (err) => {
    console.error('Database error:', err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        connection.connect((err) => {
            if (err) {
                console.error('Error reconnecting to the database:', err.message);
                process.exit(1);
            }
            console.log('Reconnected to the database.');
        });
    } else {
        throw err;
    }
});

export const ClientsCreate = (req, res) => {
    const { name, email, password, phone_number, adress, profile_picture, language } = req.body;

    connection.query(
        'CALL Clients_create(?, ?, ?, ?, ?, ?, ?)',
        [name, email, password, phone_number, adress, profile_picture, language],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const message = results[0]?.message || 'Client created successfully';
            res.status(201).json({ message, data: results });
        }
    );
};

export const ClientsGetById = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL Clients_getById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results[0].length === 0) {
                return res.status(404).json({ message: 'Client not found' });
            }
            const clientData = results[0][0];
            res.status(200).json({ message: 'Client retrieved successfully', data: clientData });
        }
    );
};

export const ClientsUpdate = (req, res) => {
    const { id, name, email, password, phone_number, adress, profile_picture, language } = req.body;

    connection.query(
        'CALL Clients_updateById(?, ?, ?, ?, ?, ?, ?, ?)',
        [id, name, email, password, phone_number, adress, profile_picture, language],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const message = results[0]?.message || 'Client updated successfully';
            res.status(200).json({ message, data: results });
        }
    );
};

export const ClientsDelete = (req, res) => {
    const id = req.query.id;
    
    connection.query(
        'CALL Clients_deleteById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
    
            const message = results[0]?.[0]?.message || 'Client deleted successfully';
    
            if (!results[0]?.[0] || message.includes('not found')) {
                return res.status(404).json({ message: 'Client not found' });
            }
    
            res.status(200).json({ message });
        }
    );
};
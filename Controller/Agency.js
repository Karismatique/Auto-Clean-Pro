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

export const AgenciesCreate = (req, res) => {
    const { name, adress, city, phone_number, email } = req.body;

    connection.query(
        'CALL Agencies_create(?, ?, ?, ?, ?)',
        [name, adress, city, phone_number, email],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Agencies created successfully', data: results });
        }
    );
};

export const AgenciesGetById = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL Agencies_getById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results[0].length === 0) {
                return res.status(404).json({ message: 'Agencies not found' });
            }
            const agencyData = results[0][0];
            res.status(200).json({ message: 'Agencies retrieved successfully', data: agencyData });
        }
    );
};

export const AgenciesUpdate = (req, res) => {
    const { id, name, adress, city, phone_number, email } = req.body;

    connection.query(
        'CALL Agencies_updateById(?, ?, ?, ?, ?, ?)',
        [id, name, adress, city, phone_number, email],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Agencies updated successfully', data: results });
        }
    );
};

export const AgenciesDelete = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL Agencies_deleteById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const message = results[0]?.[0]?.message || 'Agencies deleted successfully';

            if (!results[0]?.[0] || message.includes('not found')) {
                return res.status(404).json({ message: 'Agencies not found' });
            }

            res.status(200).json({ message });
        }
    );
};


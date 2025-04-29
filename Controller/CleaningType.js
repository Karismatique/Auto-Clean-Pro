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

export const CleaningTypesCreate = (req, res) => {
    const { name, price, discount_price } = req.body;
    connection.query(
        'CALL CleaningTypes_create(?, ?, ?)',
        [name, price, discount_price],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const message = results[0]?.message || 'Cleaning type created successfully';
            res.status(201).json({ message, data: results });
        }
    );
};

export const CleaningTypesGetById = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL CleaningTypes_getById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results[0].length === 0) {
                return res.status(404).json({ message: 'Cleaning type not found' });
            }
            const cleaningTypeData = results[0][0];
            res.status(200).json({ message: 'Cleaning type retrieved successfully', data: cleaningTypeData });
        }
    );
};

export const CleaningTypesUpdate = (req, res) => {
    const { id, name, price, discount_price } = req.body;

    connection.query(
        'CALL CleaningTypes_updateById(?, ?, ?, ?)',
        [id, name, price, discount_price],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const message = results[0]?.message || 'Cleaning type updated successfully';
            res.status(200).json({ message, data: results });
        }
    );
};

export const CleaningTypesDelete = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL CleaningTypes_deleteById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const message = results[0]?.[0]?.message || 'Cleaning type deleted successfully';

            if (!results[0]?.[0] || message.includes('not found')) {
                return res.status(404).json({ message: 'Cleaning type not found' });
            }

            res.status(200).json({ message });
        }
    );
};

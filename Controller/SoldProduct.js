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

export const SoldProductsCreate = (req, res) => {
    const { product_id, agency_id, sold_price } = req.body;

    connection.query(
        'CALL SoldProducts_create(?, ?, ?)',
        [product_id, agency_id, sold_price],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const message = results[0]?.message || 'Sold product created successfully';
            res.status(201).json({ message, data: results });
        }
    );
};

export const SoldProductsGetById = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL SoldProducts_getById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results[0].length === 0) {
                return res.status(404).json({ message: 'Sold product not found' });
            }
            const soldProductData = results[0][0];
            res.status(200).json({ message: 'Sold product retrieved successfully', data: soldProductData });
        }
    );
};

export const SoldProductsUpdate = (req, res) => {
    const { id, sold_price, agency_id } = req.body;

    connection.query(
        'CALL SoldProducts_updateById(?, ?, ?)',
        [id, sold_price, agency_id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const message = results[0]?.message || 'Sold product updated successfully';
            res.status(200).json({ message, data: results });
        }
    );
};

export const SoldProductsDelete = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL SoldProducts_deleteById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const message = results[0]?.[0]?.message || 'Sold product deleted successfully';

            if (!results[0]?.[0] || message.includes('not found')) {
                return res.status(404).json({ message: 'Sold product not found' });
            }

            res.status(200).json({ message });
        }
    );
};

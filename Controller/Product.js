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

export const ProductsCreate = (req, res) => {
    const { agency_id, name, price, discount_price, stock } = req.body;

    connection.query(
        'CALL Products_create(?, ?, ?, ?, ?)',
        [agency_id, name, price, discount_price, stock],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const message = results[0]?.message || 'Product created successfully';
            res.status(201).json({ message, data: results });
        }
    );
};

export const ProductsGetById = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL Products_getById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results[0].length === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            const productData = results[0][0];
            res.status(200).json({ message: 'Product retrieved successfully', data: productData });
        }
    );
};

export const ProductsUpdate = (req, res) => {
    const { id, name, price, discount_price, stock } = req.body;

    connection.query(
        'CALL Products_updateById(?, ?, ?, ?, ?)',
        [id, name, price, discount_price, stock],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const message = results[0]?.message || 'Product updated successfully';
            res.status(200).json({ message, data: results });
        }
    );
};

export const ProductsDelete = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL Products_deleteById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const message = results[0]?.[0]?.message || 'Product deleted successfully';

            if (!results[0]?.[0] || message.includes('not found')) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json({ message });
        }
    );
};

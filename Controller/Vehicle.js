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

export const VehiclesCreate = (req, res) => {
    const { client_id, vin, vehicle_type } = req.body;

    connection.query(
        'CALL Vehicles_create(?, ?, ?)',
        [client_id, vin, vehicle_type],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const message = results[0]?.message || 'Vehicle created successfully';
            res.status(201).json({ message, data: results });
        }
    );
};

export const VehiclesGetById = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL Vehicles_getById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results[0].length === 0) {
                return res.status(404).json({ message: 'Vehicle not found' });
            }
            const vehicleData = results[0][0];
            res.status(200).json({ message: 'Vehicle retrieved successfully', data: vehicleData });
        }
    );
};

export const VehiclesUpdate = (req, res) => {
    const { id, vin, vehicle_type } = req.body;

    connection.query(
        'CALL Vehicles_updateById(?, ?, ?)',
        [id, vin, vehicle_type],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const message = results[0]?.message || 'Vehicle updated successfully';
            res.status(200).json({ message, data: results });
        }
    );
};

export const VehiclesDelete = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL Vehicles_deleteById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const message = results[0]?.[0]?.message || 'Vehicle deleted successfully';

            if (!results[0]?.[0] || message.includes('not found')) {
                return res.status(404).json({ message: 'Vehicle not found' });
            }

            res.status(200).json({ message });
        }
    );
};

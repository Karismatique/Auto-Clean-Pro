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

export const AppointmentsCreate = (req, res) => {
    const { vehicle_id, shift_id, cleaning_type_id } = req.body;

    connection.query(
        'CALL Appointments_create(?, ?, ?)',
        [vehicle_id, shift_id, cleaning_type_id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const message = results[0]?.message || 'Appointment created successfully';
            res.status(201).json({ message, data: results });
        }
    );
};

export const AppointmentsGetById = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL Appointments_getById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results[0].length === 0) {
                return res.status(404).json({ message: 'Appointment not found' });
            }
            const appointmentData = results[0][0];
            res.status(200).json({ message: 'Appointment retrieved successfully', data: appointmentData });
        }
    );
};

export const AppointmentsUpdate = (req, res) => {
    const { id } = req.body;

    connection.query(
        'CALL Appointments_updateById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const message = results[0]?.message || 'Appointment updated successfully';
            res.status(200).json({ message, data: results });
        }
    );
};

export const AppointmentsDelete = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL Appointments_deleteById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const message = results[0]?.[0]?.message || 'Appointment deleted successfully';

            if (!results[0]?.[0] || message.includes('not found')) {
                return res.status(404).json({ message: 'Appointment not found' });
            }

            res.status(200).json({ message });
        }
    );
};

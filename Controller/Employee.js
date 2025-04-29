import mysql from 'mysql';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

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

export const EmployeesCreate = async (req, res) => {
    const { agency_id, name, email, password, is_admin } = req.body;

    if (!password || password === '') {
        return res.status(400).json({ error: 'Password is required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        connection.query(
            'CALL Employees_create(?, ?, ?, ?, ?)',
            [agency_id, name, email, hashedPassword, is_admin],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                const message = results[0]?.message || 'Employee created successfully';
                res.status(201).json({ message, data: results });
            }
        );
    } catch (err) {
        res.status(500).json({ error: 'Error hashing password' });
    }
};

export const EmployeesGetById = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL Employees_getById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (results[0].length === 0) {
                return res.status(404).json({ message: 'Employee not found' });
            }

            const employeeData = results[0][0];
            res.status(200).json({ message: 'Employee retrieved successfully', data: employeeData });
        }
    );
};

export const EmployeesUpdate = async (req, res) => {
    const { id, name, email, password, is_admin } = req.body;

    try {
        let hashedPassword = password;

        if (password && password !== '') {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        connection.query(
            'CALL Employees_updateById(?, ?, ?, ?, ?)',
            [id, name, email, hashedPassword, is_admin],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                const message = results[0]?.message || 'Employee updated successfully';
                res.status(200).json({ message, data: results });
            }
        );
    } catch (err) {
        res.status(500).json({ error: 'Error hashing password' });
    }
};

export const EmployeesDelete = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL Employees_deleteById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const message = results[0]?.[0]?.message || 'Employee deleted successfully';

            if (!results[0]?.[0] || message.includes('not found')) {
                return res.status(404).json({ message: 'Employee not found' });
            }

            res.status(200).json({ message });
        }
    );
};

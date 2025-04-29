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

export const BlogPostCreate = (req, res) => {
    const { employee_id, title, text } = req.body;

    connection.query(
        'CALL BlogPost_create(?, ?, ?)',
        [employee_id, title, text],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const message = results[0]?.message || 'Blog post created successfully';
            res.status(201).json({ message, data: results });
        }
    );
};

export const BlogPostGetById = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL BlogPost_getById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results[0].length === 0) {
                return res.status(404).json({ message: 'Blog post not found' });
            }
            const blogPostData = results[0][0];
            res.status(200).json({ message: 'Blog post retrieved successfully', data: blogPostData });
        }
    );
};

export const BlogPostUpdate = (req, res) => {
    const { id, title, text } = req.body;

    connection.query(
        'CALL BlogPost_updateById(?, ?, ?)',
        [id, title, text],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const message = results[0]?.message || 'Blog post updated successfully';
            res.status(200).json({ message, data: results });
        }
    );
};

export const BlogPostDelete = (req, res) => {
    const id = req.query.id;

    connection.query(
        'CALL BlogPost_deleteById(?)',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const message = results[0]?.[0]?.message || 'Blog post deleted successfully';

            if (!results[0]?.[0] || message.includes('not found')) {
                return res.status(404).json({ message: 'Blog post not found' });
            }

            res.status(200).json({ message });
        }
    );
};

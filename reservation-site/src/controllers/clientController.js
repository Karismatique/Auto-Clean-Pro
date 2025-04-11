const db = require('../models/db');

exports.addClient = (req, res) => {
    const { nom, email, mot_de_passe } = req.body;
    const query = "INSERT INTO clients (nom, email, mot_de_passe) VALUES (?, ?, ?)";

    db.query(query, [nom, email, mot_de_passe], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de l\'ajout du client.');
        } else {
            res.status(200).send('Client ajouté avec succès.');
        }
    });
};

exports.getAllClients = (req, res) => {
    const query = "SELECT * FROM clients";

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des clients.');
        } else {
            res.status(200).json(results);
        }
    });
};

const express = require('express');
const port = 5001;
const db = require('./data/db.js');
const server = express();
server.use(express.json());

// POST - Creates a user using the information sent inside the request body. ('/api/users')

// GET - Returns an array of all the user objects contained in the database. ('/api/users')
server.get('/api/users', (req, res) => {
    db.find()
    .then(allUsers => {
        res.json(allUsers);
    })
    .catch(err => {
        res.status(500).json({ error: "The users information could not be retrieved."})
    });
})

// GET - Returns the user object with the specified id. ('/api/users/:id')
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then(userById => {
        if (userById) {
            res.json(userById);
        } else {
            res.status(404).json({ message:"The user with the specified ID does not exist."});
        }
    })
    .catch(err => {
        res.status(code).json(err);
    });
})

// DELETE - Removes the user with the specified id and returns the deleted user. ('/api/users/:id')

// PUT - Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original. ('/api/users/:id')

//listening
server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
const express = require('express');
const port = 5001;
const db = require('./data/db.js');
const server = express();
server.use(express.json());


// POST - Creates a user using the information sent inside the request body. ('/api/users')
server.post('/api/users', (req, res) => {
    const { name, bio, created_at, updated_at } = req.body;
    if (!name || !bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }
    const now = new Date().toISOString();
    db.insert({
        name,
        bio,
        created_at: now,
        updated_at: now
    })
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
})

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
        res.status(500).json({ error: "The user information could not be retrieved." });
    });
})

// DELETE - Removes the user with the specified id and returns the deleted user. ('/api/users/:id')
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
    .then(removedUser => {
        if (removedUser) {
            res.json(removedUser);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The user could not be removed" });
    });
})

// PUT - Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original. ('/api/users/:id')
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio, created_at, updated_at } = req.body;
    if (!name || !bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }
    const now = new Date().toISOString();
    const updatedUser = {
        name,
        bio,
        created_at,
        updated_at: now
    }
    db.update(id, updatedUser)
    .then(updatedUser => {
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."});
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The user information could not be modified." });
    });
})

//listening
server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
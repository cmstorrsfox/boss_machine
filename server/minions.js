const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
});


//GET ALL Minions
minionsRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('minions'));
});

//GET Minion by ID
minionsRouter.get('/:minionId', (req, res, next) => {
        res.status(200).send(req.minion);
});

//POST request
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

//PUT request
minionsRouter.put('/:minionId', (req, res, next) => {
    const minionToUpdate = updateInstanceInDatabase('minions', req.body);
    res.status(200).send(minionToUpdate);
});

//DELETE request
minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionToDelete = deleteFromDatabasebyId('minions', req.params.minionId);
    if (minionToDelete) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});
const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});


//GET ALL Minions
ideasRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('ideas'));
});

//GET Minion by ID
ideasRouter.get('/:ideaId', (req, res, next) => {
        res.status(200).send(req.idea);
});

//POST request
ideasRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('ideas', req.body);
    res.status(201).send(newMinion);
});

//PUT request
ideasRouter.put('/:ideaId', (req, res, next) => {
    const ideaToUpdate = updateInstanceInDatabase('ideas', req.body);
    res.status(200).send(ideaToUpdate);
});

//DELETE request
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const ideaToDelete = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (ideaToDelete) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});
const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});


//GET ALL IDEAS
ideasRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('ideas'));
});

//GET IDEAS by ID
ideasRouter.get('/:ideaId', (req, res, next) => {
        res.status(200).send(req.idea);
});

//POST request
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newMinion = addToDatabase('ideas', req.body);
    res.status(201).send(newMinion);
});

//PUT request
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
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
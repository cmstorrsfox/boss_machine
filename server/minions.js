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

//WORK requests
//GET request 
minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter(workLoad => {
        return workLoad.id === req.params.minionId;
    });
    res.send(work);
})

//POST request
minionsRouter.post('/:minionId/work', (req, res, next) => {
    const newWork = addToDatabase('work', req.body);
    res.status(201).send(newWork);
})

//Router parameter for work ID requests
minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send();
    }
});

//PUT request
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
        res.status(400).send();
    } else {
        const updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    }
});

//DELETE request
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const workToDelete = deleteFromDatabasebyId('work', req.params.workId);
    if (workToDelete) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});
const { NamedModulesPlugin } = require('webpack');

const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const {
    getAllFromDatabase,
    createMeeting,
    addToDatabase,
    deleteAllFromDatabase,
} = require('./db');

meetingsRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('meetings'))
});

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    res.status(204).send(deleteAllFromDatabase('meetings'));
});
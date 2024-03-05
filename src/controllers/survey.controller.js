const Survey = require('../models/survey.model');
const Question = require('../models/question.model');


exports.createsurvey = (req, res) => {
    const { id } = req.user;
    const { title, welcomeMessage, welcomeDescription, buttonText, summaryMessage, summaryDescription, isWelcome, isSummary } = req.body;


    const survey = new Survey(id, title, welcomeMessage, welcomeDescription, buttonText, summaryMessage, summaryDescription, isWelcome, isSummary)

    Survey.create(survey, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                message: "Survey Created Successfuly"
            });
        }
    });
};


exports.fetchsurveys = (req, res) => {
    const { id } = req.user;

    Survey.findSurveyByUserId(id, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data: data
            });
        }
    });
};

exports.fetchsurveybyId = (req, res) => {
    const id = req.params.id;
    Survey.findSurveyById(id, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data: data
            });
        }
    });
};
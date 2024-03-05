const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const { survey: surveyValidator, question: questionValidator } = require('../validators/survey');
const asurveyController = require('../controllers/survey.controller');
const { authenticateToken } = require('../utils/authMiddleware');


router.route('/create-survey')
    .post(surveyValidator, authenticateToken, asyncHandler(asurveyController.createsurvey));

router.route('/fetch-all-surveys')
    .get(authenticateToken, asyncHandler(asurveyController.fetchsurveys));

    router.route('/fetch-survey/:id')
    .get(authenticateToken, asyncHandler(asurveyController.fetchsurveybyId));


module.exports = router;
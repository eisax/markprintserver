const db = require('../config/db.config');
const { logger } = require('../utils/logger');

class Question {
    constructor(surveyid, question, questionType, description) {
        this.surveyid = surveyid;
        this.question = question;
        this.questionType = questionType;
        this.description = description;
    }


    static deleteQuestion(id, cb) {
        db.query(`DELETE FROM question WHERE id = ?`, [id], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
        });
    }



    static findQuestionById(id, cb) {

        db.query(`SELECT * FROM question WHERE id = ?`, id, (err, res) => {

            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        });
    }

    static findQuestionBySurveyId(surveyId, cb) {

        db.query(`SELECT * FROM question WHERE surveyId = ?`, surveyId, (err, res) => {

            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res);
                return;
            }
            cb({ kind: "not_found" }, null);
        });
    }

    static update(question, cb) {
        db.query(`UPDATE question SET surveyId = ?, question = ?, questionType = ?, description = ? WHERE id = ?`,
            [
                question.surveyId,
                question.question,
                question.questionType,
                question.description,
                question.id
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: question.id,
                    surveyId: question.surveyId,
                    question: question.question,
                    questionType: question.questionType,
                    description: question.description
                });
            });
    }


    static create(question, cb) {
        db.query(`INSERT INTO question VALUES(null,?,?,?,?)`,
            [
                question.surveyId,
                question.question,
                question.questionType,
                question.description

            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    surveyId: question.surveyId,
                    question: question.question,
                    questionType: question.questionType,
                    description: question.description

                });
            });
    }


}

module.exports = Question;
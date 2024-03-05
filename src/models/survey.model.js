const db = require('../config/db.config');
const { logger } = require('../utils/logger');

class Survey {
    constructor(userid, title, welcomemessage, welcomedescription, buttontext, summarymessage, summarydescription, isWelcome, isSummary) {
        this.userId = userid;
        this.title = title;
        this.welcomemessage = welcomemessage;
        this.welcomedescription = welcomedescription;
        this.buttontext = buttontext;
        this.summarymessage = summarymessage;
        this.summarydescription = summarydescription;
        this.isWelcome = isWelcome;
        this.isSummary = isSummary;
    }

    static updateWelcomeVisibility(id, isWelcome, cb) {
        db.query(`UPDATE survey SET isWelcome = ? WHERE id = ?`, [id, isWelcome], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
        });
    }

    static updateWelcomeVisibility(id, isSummary, cb) {
        db.query(`UPDATE survey SET isSummary = ? WHERE id = ?`, [id, isSummary], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
        });
    }


    static deleteSurvey(id, cb) {
        db.query(`DELETE FROM survey WHERE id = ?`, [id], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
        });
    }



    static findSurveyByUserId(userId, cb) {

        db.query(`SELECT * FROM survey WHERE userId = ?`, userId, (err, res) => {

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

    static findSurveyById(id, cb) {
        
        db.query(`SELECT * FROM survey WHERE id = ?`, [id], (err, surveyRes) => {
            
            if (err) {
                console.log(err)
                logger.error(err.message);
                cb(err, null);
                return;
            }
            
            if (surveyRes.length) {
                const survey = surveyRes[0];
                db.query(`SELECT * FROM question WHERE surveyId = ?`, [id], (err, questionRes) => {
                    if (err) {
                        logger.error(err.message);
                        cb(err, null);
                        return;
                    }
                    survey.questions = questionRes;
                    cb(null, survey);
                });
                return;
            }
            cb({ kind: "not_found" }, null);
        });
    }
    

    static create(survey, cb) {
        db.query(`INSERT INTO survey VALUES(null,?,?,?,?,?,?,?,?,?)`,
            [
                survey.userId,
                survey.title,
                survey.welcomemessage,
                survey.welcomedescription,
                survey.buttontext,
                survey.summarymessage,
                survey.summarydescription,
                survey.isWelcome,
                survey.isSummary

            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    userId: survey.userId,
                    title: survey.title,
                    welcomemessage: survey.welcomemessage,
                    welcomedescription: survey.welcomedescription,
                    buttontext: survey.buttontext,
                    summarymessage: survey.summarymessage,
                    summarydescription: survey.summarydescription,
                    isWelcome: survey.isWelcome,
                    isSummary: survey.isSummary
                });
            });
    }


}

module.exports = Survey;
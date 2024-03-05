const db = require('../config/db.config');
const { createNewUser: createNewUserQuery, findUserByEmail: findUserByEmailQuery } = require('../database/queries');
const { logger } = require('../utils/logger');

class User {
    constructor(firstname, lastname, email, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    static updateToken(userId, token, cb) {
        db.query(`UPDATE users SET token = ? WHERE id = ?`, [token, userId], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
        });
    }

    

    static findByToken(token, cb) {
        
        db.query(`SELECT * FROM users WHERE token = ?`, token, (err, res) => {
      
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return ;
            }
            
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        });
    }

    static create(newUser, cb) {
        db.query(createNewUserQuery,
            [
                newUser.firstname,
                newUser.lastname,
                newUser.email,
                newUser.password
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.userId,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    email: newUser.email
                });
            });
    }

    static findByEmail(email, cb) {
        db.query(findUserByEmailQuery, email, (err, res) => {
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
        })
    }
}

module.exports = User;
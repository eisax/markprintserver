const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUsers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    token VARCHAR(255) NULL UNIQUE
) 
`;

const createTableSurveys = `
CREATE TABLE IF NOT EXISTS survey (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    title VARCHAR(255),
    welcomemessage VARCHAR(255),
    welcomedescription TEXT,
    buttontext VARCHAR(100),
    summarymessage VARCHAR(255),
    summarydescription TEXT,
    isWelcome BOOLEAN,
    isSummary BOOLEAN,
    FOREIGN KEY (userId) REFERENCES users(id)
)
`;

const createTableQuestions = `
CREATE TABLE IF NOT EXISTS question (
    id INT PRIMARY KEY AUTO_INCREMENT,
    surveyid INT,
    question VARCHAR(255),
    questionType VARCHAR(255),
    description TEXT,
    FOREIGN KEY (surveyid) REFERENCES survey(id)
)
`;

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, ?, NOW(),null)
`;

const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;

module.exports = {
    createDB,
    dropDB,
    createTableUsers,
    createNewUser,
    findUserByEmail,
    createTableSurveys,
    createTableQuestions
};

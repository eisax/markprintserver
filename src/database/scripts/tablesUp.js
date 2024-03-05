const { logger } = require('../../utils/logger');
const { createTableUsers: createTableUsersQuery, createTableSurveys: createTableSurveysQuery,createTableQuestions: createTableQuestionsQuery} = require('../queries');

const tableCreationQueries = [createTableUsersQuery, createTableSurveysQuery,createTableQuestionsQuery]; 

(() => {
    const db = require('../../config/db.config');
    let currentIndex = 0;

    const executeNextQuery = () => {
        if (currentIndex < tableCreationQueries.length) {
            db.query(tableCreationQueries[currentIndex], (err, _) => {
                if (err) {
                    logger.error(err.message);
                    process.exit(1);
                }
                logger.info(`Table ${tableCreationQueries[currentIndex].name} created!`);
                currentIndex++;
                executeNextQuery(); // Execute the next query
            });
        } else {
            logger.info('All tables created!');
            process.exit(0);
        }
    };

    executeNextQuery(); // Start executing queries
})();

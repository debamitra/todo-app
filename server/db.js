const Pool = require("pg").Pool;

const pool = new Pool({
    user:"learnpern",
    host:"localhost",
    port:5432,
    database:"learnpern"
});


module.exports = pool;
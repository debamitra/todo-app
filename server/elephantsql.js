const Pool = require("pg").Pool;

const pool = new Pool({
    connectionString: "postgres://ekamqiyh:4TCcRF5erj0XCTcCXklISB1-ETF6YM0M@john.db.elephantsql.com/ekamqiyh"
});


module.exports = pool;
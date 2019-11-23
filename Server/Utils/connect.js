// var mysql = require('mysql');

// module.exports = () => {
//     Database = {}
//     Database.connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'rootadmin',
//         database: "grocerymgr"
//     });
//     Database.connection.connect();
//     return Database.connection;
// }

var mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: 'rootadmin',
    database: "grocerymgr"
});

// var mysql = require("mysql");
// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: 'rootadmin',
//     database: "grocerymgr"

// });

module.exports = pool;
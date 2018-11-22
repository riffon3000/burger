// Import MySQL connection.
const connection = require('../config/connection.js');

// Loops through and creates an array of question marks
// ['?', '?', '?'] - and turns it into a string
// ['?', '?', '?'].toString() => '?,?,?'
function printQuestionMarks(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push('?');
    }
    return arr.toString();
}

// Convert object key/value pairs to SQL syntax
function objToSql(ob) {
    let arr = [];
    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
        let value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Burger => 'Burger')
            if (typeof value === 'string' && value.indexOf(' ') >= 0) {
                value = `'${value}'`;
            }
            // e.g. {burger_name: 'Burger'} => ['burger_name='Burger'']
            // e.g. {devoured: true} => ['devoured=true']
            arr.push(`${key}=${value}`);
        }
    }

    // translate array of strings to single comma-separated string
    return arr.toString();
}

// Object for SQL statement functions.
const orm = {
    selectAll: (tableInput, cb) => {
        let queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: (table, cols, vals, cb) => {
        let queryString = 'INSERT INTO ' + table;

        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += printQuestionMarks(vals.length);
        queryString += ') ';

        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    // Example objColVals {burger_name: Bruger, devoured: true}
    updateOne: (table, objColVals, condition, cb) => {
        let queryString = 'UPDATE ' + table;

        queryString += ' SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    delete: (table, condition, cb) => {
        let queryString = 'DELETE FROM ' + table;
        queryString += ' WHERE ';
        queryString += condition;

        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
};

// Export orm object for model (burger.js).
module.exports = orm;
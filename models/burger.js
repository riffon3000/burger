// Import ORM to crburgere functions to interact with the burgerabase.
const orm = require('../config/orm.js');

const burger = {
    selectAll: (cb) => {
        orm.selectAll('burgers', (res) => {
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    insertOne: (cols, vals, cb) => {
        orm.insertOne('burgers', cols, vals, (res) => {
            cb(res);
        });
    },
    updateOne: (objColVals, condition, cb) => {
        orm.updateOne('burgers', objColVals, condition, (res) => {
            cb(res);
        });
    },
    delete: (condition, cb) => {
        orm.delete('burgers', condition, (res) => {
            cb(res);
        });
    }
};

// Export database functions for the controller (burgers_controller.js).
module.exports = burger;
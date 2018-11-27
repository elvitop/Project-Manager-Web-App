const ps = require('pg-promise').PreparedStatement;
const sql = {
    addUser: new ps('add-user', 'SELECT users_username, users_password FROM public.users WHERE users_username = $1 AND users_password = $2')
}

module.exports = sql;
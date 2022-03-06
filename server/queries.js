const createUserQuery = `INSERT INTO
users(email, name, password, created_on)
VALUES($1, $2, $3, $4)
returning *`;

const userDetailsQuery = 'SELECT * FROM users WHERE email = $1';


const allTodosQuery = 'SELECT * FROM todo WHERE user_id = $1 ORDER BY completed_on DESC'

const userNameQuery = 'SELECT user_name FROM users WHERE user_id = $1'

const oneTodoQuery = 'SELECT * FROM todo WHERE todo_id= $1 AND user_id= $2'

const insertTodoQuery = 'INSERT INTO todo(message,user_id) values($1, $2) RETURNING *'

const deleteTodoQuery = 'DELETE FROM todo WHERE todo_id=$1'

const userQuery = 'SELECT * from users WHERE user_email = $1'

const insertUserQuery = 'INSERT INTO users (user_name, user_email, user_password) values ($1, $2 ,$3) RETURNING *'






export {
    createUserQuery,
    userDetailsQuery,
    allTodosQuery,
    userNameQuery,
    oneTodoQuery,
    insertTodoQuery,
    deleteTodoQuery,
    userQuery,
    insertUserQuery
};
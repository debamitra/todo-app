# todo-app

TABLE todo
- todo_id
- list_id
- user_id
- message
- index
- status
- completed_on
- created_on
- is_deleted

TABLE list
- list_id
- list_name
- user_id 
- created_on
- is_deleted

TABLE user
- user_id
- user_name
- user_email
- user_password



1. Get all todos for a list for a user  INPUT  - userid, listid
2. Get all todos for a user     INPUT - userid
3. Get one todo INPUT todoid
4. Insert a todo to a list for a user   INPUT - todoid, listid, user
5. Delete a todo    INPUT - todoid 
6. Delete selected todos    INPUT - todoid 
7. Update a todo    INPUT - todoid

8. Get all lists for a user INPPUT - user_id
9. Get one list for a user INPUT - list_id or list_name
10. Insert a list for a user INPUT - list_id, list_name, user_id
11. Delete a todo    INPUT - todoid 
12. Delete selected todos    INPUT - todoid 
13. Update a todo    INPUT - todoid


GET /todos

GET /todo/:id

POST /todo

DELETE /todo

PUT /todo/:id


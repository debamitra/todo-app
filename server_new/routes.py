import app
from flask import request
import database
import bcrypt
from utils import *



@app.route("/todos", methods=["GET"])
def todos():
    response = {}
    if request.method == "GET":
        id = request.args.get("id") 
        if id:
            # Get a single todo
            connection = database.get_db_connection()
            cur = connection.cursor()
            cur.execute("SELECT * from todo;")
            result = cur.fetchall()
            cur.close()
            connection.close()
            response['data'] = result
            response["status"] = {
                "statusCode": "200",
                "statusMessage": "Success"
            }
        else:
            # Get all todos
            connection = database.get_db_connection()
            cur = connection.cursor()
            cur.execute("SELECT * from todo;")
            result = cur.fetchall()
            cur.close()
            connection.close()
            response['data'] = result
            response["status"] = {
                "statusCode": "200",
                "statusMessage": "Success"
            }
            return response
    elif request.method == "POST":
        # Create a new todo
        message = request.args.get("message")
        connection = database.get_db_connection()
        cur = connection.cursor()
        cur.execute(f'INSERT into todo (message, user_id) VALUES({message}, "user1") RETURNING * ;')
        result = cur.fetchall()
        cur.close()
        connection.close()
        response['data'] = result
        response["status"] = {
            "statusCode": "200",
            "statusMessage": "Success"
        }
        return response
    elif request.method == "DELETE":
        # Delete a todo
        id = request.args.get("id")
        connection = database.get_db_connection()
        cur = connection.cursor()
        cur.execute(f'DELETE FROM todo WHERE todo_id={id}')
        result = cur.fetchall()
        cur.close()
        connection.close()
        response['data'] = result
        response["status"] = {
            "statusCode": "200",
            "statusMessage": "Success"
        }
        return response
    elif request.method == "PUT":
        id = request.args.get("id")
        req_object = request.json()
        message = req_object['message']
        status = req_object['status']
        connection = database.get_db_connection()
        cur = connection.cursor()
        cur.execute(f'UPDATE todo SET message={message}, status={status} WHERE todo_id={id}')
        result = cur.fetchall()
        cur.close()
        connection.close()
        response['data'] = result
        response["status"] = {
            "statusCode": "200",
            "statusMessage": "Success"
        }
        return response


@app.route("/lists", methods=["GET,POST"])
def lists():
    response={}
    if request.method("GET"):
        # Get all lists
            connection = database.get_db_connection()
            cur = connection.cursor()
            cur.execute("SELECT * from list;")
            result = cur.fetchall()
            cur.close()
            connection.close()
            response['data'] = result
            response["status"] = {
                "statusCode": "200",
                "statusMessage": "Success"
            }
            return response
    elif request.method("POST"):
        # Create a new list
        list_name = request.args.get("list_name")
        connection = database.get_db_connection()
        cur = connection.cursor()
        cur.execute(f'INSERT INTO list(list_name,user_id) values({list_name,"user1"}) RETURNING *')
        result = cur.fetchall()
        cur.close()
        connection.close()
        response['data'] = result
        response["status"] = {
            "statusCode": "200",
            "statusMessage": "Success"
        }


@app.route('/register', method=["POST"])
def register():
    request_obj = request.json()
    email = request_obj['email']
    password = request_obj['password']
    encrypted_password = bcrypt.hashpw(password,bcrypt.gensalt())
    name = request_obj['name']
    connection = database.get_db_connection()
    cur = connection.cursor()
    cur.execute(f'INSERT INTO users (user_name, user_email, user_password) values ({name}, {email} ,{encrypted_password}) RETURNING *')
    result = cur.fetchall()
    print(result)
    cur.close()
    connection.close()
    user_id = result[0]['user_id']
    auth_token = jwt_encode(user_id)
    auth_token_string = auth_token.decode()
    response = {}
    response['data'] = {
        "token":auth_token_string,
    }
    response["status"] = {
        "statusCode": "200",
        "statusMessage": "Success"
    }
    return response














from flask import Flask, request, jsonify, redirect, url_for,current_app
from flask_cors import CORS
import openai
from flask.cli import run_command
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import click
from sqlalchemy import inspect
from flask_dance.contrib.google import make_google_blueprint, google
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
import json
from flask_dance.consumer import oauth_authorized
from oauthlib.oauth2.rfc6749.errors import TokenExpiredError
from dotenv import load_dotenv
load_dotenv()

# Set up Flask-Dance blueprint
blueprint = make_google_blueprint(
    client_id='839413605526-2djlj2kfcrsp5bttqpv9rspsf4jgssv3.apps.googleusercontent.com',
    client_secret='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',
    scope=["profile", "email"],
    redirect_url="/google/authorized"
)



app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
app.secret_key = 'supersecret'

app.register_blueprint(blueprint, url_prefix="/login")


# Set up Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)

# User class for Flask-Login
class User:
    def __init__(self, id):
        self.id = id

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)


@login_manager.user_loader
def load_user(user_id):
    return User(user_id)







# Models
class UserDetail(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.name

    def serialize(self):
        return {
            'user_id': self.user_id,
            'name': self.name,
            'email': self.email
        }


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    text = db.Column(db.String(255), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    completed_on = db.Column(db.DateTime)
    created_on = db.Column(db.DateTime, default=datetime.utcnow)
    is_deleted = db.Column(db.Boolean, default=False)
    category = db.Column(db.String(255), nullable=True)
    timespent = db.Column(db.Integer, default=0)
    estimate = db.Column(db.String(255), default='1 Day')
    priority = db.Column(db.String(255), nullable=True)
    due = db.Column(db.Integer, nullable=True)

    def __repr__(self):
        return '<Todo %r>' % self.text

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'text': self.text,
            'completed': self.completed,
            'completed_on': self.completed_on.isoformat() if self.completed_on else None,
            'created_on': self.created_on.isoformat(),
            'is_deleted': self.is_deleted,
            'category':self.category,
            'timespent':self.timespent,
            'estimate':self.estimate,
            'priority':self.priority,
            'due':self.due
        }




       
        

@app.route("/api/signin")
def index():
    print(current_user.is_authenticated)
    try:
        if current_user.is_authenticated:
            return f"You are logged in as {google.get('/oauth2/v1/userinfo').json()['email']}"
        else:
            return redirect(url_for("google.login"))
    except:
        return redirect(url_for("google.login"))


@app.route("/logout")
@login_required
def logout():   
    logout_user()
    if google.authorized:
        resp = google.get("https://accounts.google.com/o/oauth2/revoke",
                           params={"token": google.token["id_token"]},
                           headers={"content-type": "application/x-www-form-urlencoded"})
        if resp.ok:
            del google.token
    print(current_user.is_authenticated)
    return {"data": "loggedout"}


import time
@app.route("/api/profile")
@login_required
def profile():
    print("in /prifile")
    print(google.authorized)
    try:
        
        data = google.get("/oauth2/v1/userinfo").json()
    except:
        return redirect(url_for("google.login"))
    print(data)
    name = data["name"]
    email = data["email"]
    user = UserDetail.query.filter_by(email=email).first() 
    print(user)
    resp = {}
    resp["user_id"] = user.user_id
    resp["email"] = user.email
    resp["name"] = user.name
    return resp
    


# Google Callback
@app.route("/google/authorized")
def authorized():
    print("in authorized")
    resp = blueprint.session.get("/oauth2/v1/userinfo")
    if not resp.ok:
        return "Failed to fetch user info."
    email = resp.json()["email"]
    name = resp.json()["name"]
    user = User(email)
    login_user(user)
    redirect_url = "http://localhost"
    access_token = google.token["id_token"]
    print(access_token)
    #query_params = {"access_token": access_token}
    redirect_url_with_query = "http://localhost?token=" + access_token
    print(redirect_url_with_query)
    print(current_user.is_authenticated)
    if UserDetail.query.filter_by(email=email).first() == None:
        user_db = UserDetail(name=name , email=email, password='password')
    
        db.session.add(user_db)
        db.session.commit()
    
    return redirect(redirect_url_with_query)
    



@app.route('/api/breakdown', methods=['POST'])
def return_todos_list():
    prompt = request.json.get('todo')
    print("promp",prompt)
    smaller_todos = breakdown_todos(prompt)
    print("here")
    print(smaller_todos)
    return jsonify(smaller_todos)


def breakdown_todos(inputtext):
    openai.api_key = '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'
    #inputtext = "read this blog and build a business using the ideas in it https://www.ycombinator.com/blog."
    print("hello")
    response = openai.Completion.create(
    model="text-davinci-003",
    prompt=f'Breakdown into smallter todos upto 5 with estimate and share as a list - "+  {inputtext}',
    temperature=0,
    max_tokens=94,
    top_p=1.0,
    frequency_penalty=0.0,
    presence_penalty=0.0,
    stop=["\"\"\""]
    )
    print(response)
    print(response["choices"][0]["text"])    

    text = response["choices"][0]["text"]

    todos = []
    for line in text.split('\n'):
        if line.strip() != '':
            parts = line.split('(')
            todo = parts[0].strip()
            todo = todo.lstrip("1234567890. ")
            todo = f"{todo} ({inputtext})"
            # text = "Brainstorm ideas for a business (read this blog and build a business using the ideas in it https://www.ycombinator.com/blog.)"

            # pattern = r"\((.*?)\)"  # find text inside brackets

            # # replace each match with HTML tags
            # todo = re.sub(pattern, r'<i style={{color:"grey",fontSize:"small"}}>\1</i>', todo)

            # print(todo)

            time = parts[1].strip(')').strip()

            todos.append({'todo': todo, 'time': time})

    json_output = json.dumps(todos)
    print(json_output)
    return json_output







# Get all todos for a user
@app.route('/api/todos', methods=['GET'])
#@login_required
def get_todos():
    user_id = request.args.get('user_id')

    todos = Todo.query.filter_by(user_id=user_id, is_deleted=False).all()
    return jsonify([todo.serialize() for todo in todos])


#  Get one todo 
# @app.route('/todos/<int:todo_id>', methods=['GET'])
# @login_required
# def get_todo(todo_id):
#     todo = Todo.query.filter_by(todo_id=todo_id, is_deleted=False).first()
#     if todo:
#         return jsonify(todo.serialize())
#     else:
#         return jsonify({'message': 'Todo not found'}), 404


# Create a new todo
@app.route('/api/todos', methods=['POST'])
@login_required
def create_todo():
    
    id = request.json.get('id')
    user_id = request.json.get('user_id')
    text = request.json.get('text')
    print(request.json)
    #index = request.json.get('index')
    todo = Todo(id=id,user_id=user_id, text=text)
    db.session.add(todo)
    db.session.commit()
    return jsonify(todo.serialize()), 201


# Delete a todo
@app.route('/api/todos', methods=['DELETE'])
@login_required
def delete_todo():
    id = request.json.get("id")
    todo = Todo.query.filter_by(id=id, is_deleted=False).first()
    if todo:
        #todo.is_deleted = True
        db.session.delete(todo)
        db.session.commit()
        return jsonify({'message': 'Todo deleted'})
    else:
        return jsonify({'message': 'Todo not found'}), 404


# @app.route('/todos/delete_selected', methods=['POST'])
# def delete_selected_todos():
#     todo_ids = request.json.get('todo_ids')
#     todos = Todo.query.filter(Todo.todo_id.in_(todo_ids), Todo.is_deleted==False).all()
#     for todo in todos:
#         todo.is_deleted = True
#     db.session.commit()
#     return jsonify({'message': 'Todos deleted'})

# Update a todo
@app.route('/api/todos', methods=['PUT'])
@login_required
def update_todo():
    id = request.json.get("id")
    
    todo = Todo.query.filter_by(id=id,is_deleted=False).first()
    print(todo)
    if todo:
        text = request.json.get('text')
        completed = request.json.get('completed')
        category = request.json.get('category')
        timespent = request.json.get('timespent')
        estimate = request.json.get('estimate')
        priority = request.json.get('priority')
        due = request.json.get('due')

        if text:
            todo.text = text
        if completed != None:
            todo.completed = completed
            if completed:
                todo.completed_on = datetime.now()
            else:
                todo.completed_on = None
        if timespent:
            todo.timespent = timespent
        if category:
            todo.category = category
        if estimate:
            todo.estimate = estimate
        if priority:
            todo.priority = priority
        if due:
            todo.due = due
        db.session.commit()
        return jsonify(todo.serialize())
    else:
        return jsonify({'message': 'Todo not found'}), 404




# Create all the tables in DB
with app.app_context():
        db.create_all() 
        print("All tables created")
with app.app_context():
    tables = inspect(db.engine).get_table_names()
    print(tables)


@app.cli.command("createdb")
def create_all():
    db.create_all()
    print("All tables created")



if __name__ == "__main__":
    app.run(host='0.0.0.0')



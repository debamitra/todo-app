from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import click


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), nullable=False)
    user_email = db.Column(db.String(50), nullable=False)
    user_password = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.user_name

    def serialize(self):
        return {
            'user_id': self.user_id,
            'user_name': self.user_name,
            'user_email': self.user_email
        }

class List(db.Model):
    list_id = db.Column(db.Integer, primary_key=True)
    list_name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.utcnow)
    is_deleted = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return '<List %r>' % self.list_name

    def serialize(self):
        return {
            'list_id': self.list_id,
            'list_name': self.list_name,
            'user_id': self.user_id,
            'created_on': self.created_on.isoformat(),
            'is_deleted': self.is_deleted
        }

class Todo(db.Model):
    todo_id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    message = db.Column(db.String(255), nullable=False)
    index = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Boolean, default=False)
    completed_on = db.Column(db.DateTime)
    created_on = db.Column(db.DateTime, default=datetime.utcnow)
    is_deleted = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return '<Todo %r>' % self.message

    def serialize(self):
        return {
            'todo_id': self.todo_id,
            'list_id': self.list_id,
            'user_id': self.user_id,
            'message': self.message,
            'index': self.index,
            'status': self.status,
            'completed_on': self.completed_on.isoformat() if self.completed_on else None,
            'created_on': self.created_on.isoformat(),
            'is_deleted': self.is_deleted
        }



@app.route('/lists', methods=['GET'])
def get_lists():
    user_id = request.args.get('user_id')
    lists = List.query.filter_by(user_id=user_id, is_deleted=False).all()
    return jsonify([list.serialize() for list in lists])

@app.route('/lists/<int:list_id>', methods=['GET'])
def get_list(list_id):
    list = List.query.filter_by(list_id=list_id, is_deleted=False).first()
    if list:
        return jsonify(list.serialize())
    else:
        return jsonify({'message': 'List not found'}), 404

@app.route('/lists', methods=['POST'])
def create_list():
    list_id = request.json.get('list_id')
    list_name = request.json.get('list_name')
    user_id = request.json.get('user_id')
    list = List(list_id=list_id, list_name=list_name, user_id=user_id)
    db.session.add(list)
    db.session.commit()
    return jsonify(list.serialize()), 201

@app.route('/lists/<int:list_id>', methods=['DELETE'])
def delete_list(list_id):
    list = List.query.filter_by(list_id=list_id, is_deleted=False).first()
    if list:
        list.is_deleted = True
        db.session.commit()
        return jsonify({'message': 'List deleted'})
    else:
        return jsonify({'message': 'List not found'}), 404

@app.route('/todos', methods=['GET'])
def get_todos():
    user_id = request.args.get('user_id')
    list_id = request.args.get('list_id')
    if list_id:
        todos = Todo.query.filter_by(user_id=user_id, list_id=list_id, is_deleted=False).all()
    else:
        todos = Todo.query.filter_by(user_id=user_id, is_deleted=False).all()
    return jsonify([todo.serialize() for todo in todos])

@app.route('/todos/<int:todo_id>', methods=['GET'])
def get_todo(todo_id):
    todo = Todo.query.filter_by(todo_id=todo_id, is_deleted=False).first()
    if todo:
        return jsonify(todo.serialize())
    else:
        return jsonify({'message': 'Todo not found'}), 404

@app.route('/todos', methods=['POST'])
def create_todo():
    todo_id = request.json.get('todo_id')
    list_id = request.json.get('list_id')
    user_id = request.json.get('user_id')
    message = request.json.get('message')
    index = request.json.get('index')
    todo = Todo(todo_id=todo_id, list_id=list_id, user_id=user_id, message=message, index=index)
    db.session.add(todo)
    db.session.commit()
    return jsonify(todo.serialize()), 201

@app.route('/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    todo = Todo.query.filter_by(todo_id=todo_id, is_deleted=False).first()
    if todo:
        todo.is_deleted = True
        db.session.commit()
        return jsonify({'message': 'Todo deleted'})
    else:
        return jsonify({'message': 'Todo not found'}), 404

@app.route('/todos/delete_selected', methods=['POST'])
def delete_selected_todos():
    todo_ids = request.json.get('todo_ids')
    todos = Todo.query.filter(Todo.todo_id.in_(todo_ids), Todo.is_deleted==False).all()
    for todo in todos:
        todo.is_deleted = True
    db.session.commit()
    return jsonify({'message': 'Todos deleted'})

@app.route('/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    todo = Todo.query.filter_by(todo_id=todo_id, is_deleted=False).first()
    if todo:
        message = request.json.get('message')
        index = request.json.get('index')
        status = request.json.get('status')
        completed_on = request.json.get('completed_on')
        if message:
            todo.message = message
        if index:
            todo.index = index
        if status != None:
            todo.status = status
            if status:
                todo.completed_on = datetime.now()
            else:
                todo.completed_on = None
        db.session.commit()
        return jsonify(todo.serialize())
    else:
        return jsonify({'message': 'Todo not found'}), 404
    
@app.cli.command('createdb')
def create_all():
    db.create_all()
    print('All tables created')


if __name__ == "__main__":
    app.run(host='0.0.0.0')



from db_init import db
from flask_login import UserMixin

# from sqlalchemy import event


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return f"User('{self.username}', lists: '{self.lists}')"

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "lists": [list.to_dict() for list in self.lists],
        }


class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    tasks = db.relationship("Task", backref="list", lazy=True)

    def to_dict(self):
    
        return {
            "id": self.id,
            "name": self.name,
        }
    

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey("task.id"), nullable=True)
    list_id = db.Column(db.Integer, db.ForeignKey("list.id"), nullable=True)
    subtasks = db.relationship("Task", backref=db.backref("parent", remote_side=[id]))# noqa
    depth = db.Column(db.Integer, nullable=False, default=0)
    completed = db.Column(db.Boolean, nullable=False, default=False)

    def calculate_depth(self):
        def calculate_depth_recursive(task):
            if task.parent is None:
                return 0
            else:
                parent_depth = calculate_depth_recursive(task.parent)
                return parent_depth + 1 if parent_depth < 3 else 3

        if self.parent_id is not None:
            return calculate_depth_recursive(self)
        else:
            return 0

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "parent_id": self.parent_id,
            "list_id": self.list_id,
            "depth": self.depth,
            "completed": self.completed,
            "subtasks": [subtask.to_dict() for subtask in self.subtasks],
        }

from . import db


class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    tasks = db.relationship('Task', backref='list', lazy='dynamic')


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'))
    is_completed = db.Column(db.Boolean, default=False)


class SubTasks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    parent_id = db.Column(db.Integer, db.ForeignKey('task.id'))
    is_completed = db.Column(db.Boolean, default=False)
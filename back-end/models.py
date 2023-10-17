from db_init import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    lists = db.relationship('List', backref='user', lazy=True)


class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    tasks = db.relationship("Task", backref="list", lazy=True)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey("task.id"), nullable=True)
    list_id = db.Column(db.Integer, db.ForeignKey("list.id"), nullable=True)
    subtasks = db.relationship("Task", backref=db.backref("parent", remote_side=[id]))# noqa
    depth = db.Column(db.Integer, default=0)

    def calculate_depth(self):
        if self.parent is None:
            return 0
        else:
            return self.parent.calculate_depth() + 1 if self.parent.depth < 3 else 3# noqa

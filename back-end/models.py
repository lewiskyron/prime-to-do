from db_init import db
# from sqlalchemy import event


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
    depth = db.Column(db.Integer, nullable=False, default=0)

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


# @event.listens_for(Task, 'before_insert')
# def calculate_and_set_depth(mapper, connection, target):
#     # Calculate and set the depth before inserting into the database
#     target.depth = target.calculate_depth()
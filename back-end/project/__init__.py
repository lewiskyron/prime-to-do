from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    db.init_app(app)

    from . import models
    from . import test
    with app.app_context():
        db.create_all()
        data = test.import_data()
        test.insert_lists(data)
        test.insert_subtasks(data)
    return app

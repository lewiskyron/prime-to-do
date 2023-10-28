# server.py
from flask import Flask
from flask_cors import CORS
from db_init import db
from models import User
from main import main
from tasks import tasks
from auth import auth_bp
from flask_login import LoginManager

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True
app.register_blueprint(main, url_prefix="/api")
app.register_blueprint(tasks, url_prefix="/api")
app.register_blueprint(auth_bp, url_prefix="/api")
db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
app.secret_key = "test"


@login_manager.user_loader
def load_user(id):
    return db.session.get(User, id)


with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(port=8000, debug=True)

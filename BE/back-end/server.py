# server.py
from flask import Flask
from flask_cors import CORS
from db_init import db
from main import main
from tasks import tasks

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.register_blueprint(main, url_prefix="/api")
app.register_blueprint(tasks, url_prefix="/api")
db.init_app(app)
with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(port=8000, debug=True)

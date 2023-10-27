from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from models import User, db


auth_bp = Blueprint("auth_bp", __name__)


@auth_bp.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        username = data["username"]
        email = data["email"]
        password = data["password"]
        password_hash = generate_password_hash(password)

        if User.query.filter_by(username=username).first():
            return jsonify({"message": "Username already exists!"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"message": "Email already exists!"}), 400

        new_user = User(username=username, email=email, password_hash=password_hash)# noqa 

        db.session.add(new_user)
        db.session.commit()
        print(f"New user created: {new_user.username}")
        return jsonify({"message": "New user created!"}), 201
    except Exception as e:
        print(f"Error creating new user: {e}")
        return jsonify({"message": f"Error creating new user: {e}"}), 400
    

@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        login = data["login"]  # can be either username or email
        password = data["password"]

        user = (
            User.query.filter_by(username=login).first()
            or User.query.filter_by(email=login).first()
        )

        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({"message": "Username or password is incorrect!"}), 400# noqa
        login_user(user)
        print(f"User {user.username} logged in successfully! Session id: {user.id}")# noqa
        return (
            jsonify({"message": "Logged in successfully!", "username": user.username}),# noqa
            200,
        )
    except Exception as e:
        print(f"Error logging in: {e}")
        return jsonify({"message": f"Error logging in: {e}"}), 400


@auth_bp.route("/logout", methods=["POST"])
@login_required
def logout():
    try:
        print(f"User {current_user.username} logged out successfully!")
        logout_user()
        return jsonify({"message": "Logged out successfully!"}), 200
    except Exception as e:
        return jsonify({"message": f"Error logging out: {e}"}), 400
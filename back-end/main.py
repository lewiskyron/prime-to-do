from flask import blueprints
from models import List, Task # noqa
from flask import jsonify, request, make_response
from db_init import db

main = blueprints.Blueprint("main", __name__)


@main.route("/")
def home():
    return "Welcome Home"


@main.route("/about")
def about():
    return "About Us"


@main.route("/GetLists", methods=["GET"])
def get_lists():
    try:
        lists = List.query.all()
        output = [{"id": list.id, "name": list.name, "user_id": list.user_id, "tasks": list.tasks} for list in lists]  # noqa
        return jsonify({"lists": output}), 200
    except Exception as e:
        # Log the exception for debugging
        print(str(e))
        return make_response(jsonify({"error": "An error occurred while fetching the lists."}), 500)  # noqa


@main.route("/Addlists", methods=["POST"])
def add_list():
    data = request.get_json()
    new_list = List(name=data["name"], user_id=data["user_id"])
    db.session.add(new_list)
    db.session.commit()
    return jsonify({"message": "List added successfully!"}), 200
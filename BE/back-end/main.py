from flask import blueprints
from models import List, Task # noqa
from flask import jsonify, request
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
    success_message = "Successfully retrieved all lists from the database."
    failure_message = "Failed to retrieve all lists from the database."
    success_status = 200
    try:
        lists = List.query.all()
        print("User retrieved all lists from the database")
        return (
            jsonify(
                {
                    "message": success_message,
                    "lists": [list.to_dict() for list in lists],
                }
            ),
            success_status,
        )
        # Log the exception for debugging
    except Exception as e:
        return jsonify({"message": f"{failure_message}. error is {e}"}), 400


@main.route("/Addlists", methods=["POST"])
def add_list():
    data = request.get_json()
    new_list = List(name=data["name"], user_id=data["user_id"])
    db.session.add(new_list)
    db.session.commit()
    return jsonify({"message": "List added successfully!"}), 200


@main.route("/DeleteList/<int:list_id>", methods=["DELETE"])
def delete_list(list_id):
    list_to_delete = List.query.filter_by(id=list_id).first()

    if not list_to_delete:
        return jsonify({"message": "List not found!"}), 404

    db.session.delete(list_to_delete)
    db.session.commit()
    return jsonify({"message": "List deleted successfully!"}), 200


@main.route("/EditList/<int:list_id>", methods=["PUT"])
def edit_list(list_id):
    data = request.get_json()
    list_to_edit = List.query.filter_by(id=list_id).first()

    if not list_to_edit:
        return jsonify({"message": "List not found!"}), 404

    # Assuming 'name' is a property of the list you want to edit
    if 'name' in data:
        list_to_edit.name = data['name']

    # Add more fields to update as needed

    db.session.commit()
    return jsonify({"message": "List updated successfully!"}), 200

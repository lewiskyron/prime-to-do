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

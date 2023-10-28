from flask import blueprints
from models import List, Task, User # noqa
from flask import jsonify, request
from db_init import db
from flask_login import current_user, login_required  # noqa

main = blueprints.Blueprint("main", __name__)


@main.route("/GetLists", methods=["GET"])
@login_required
def get_lists():
    success_message = "Successfully retrieved user's lists from the database."
    failure_message = "Failed to retrieve user's lists from the database."
    success_status = 200

    user_id = current_user.id

    try:
        # Filter lists by user_id
        lists = List.query.filter_by(user_id=user_id).all()
        print(f"User {user_id} retrieved their lists from the database")
        return (
            jsonify(
                {
                    "message": success_message,
                    "lists": [list.to_dict() for list in lists],
                }
            ),
            success_status,
        )
    except Exception as e:
        return jsonify({"message": f"{failure_message}. Error is {e}"}), 400


@main.route("/Addlists", methods=["POST"])
@login_required
def add_list():
    data = request.get_json()
    new_list = List(name=data["name"], user_id=current_user.id)
    db.session.add(new_list)
    db.session.commit()
    return jsonify({"message": "List added successfully!"}), 200


@main.route("/DeleteList/<int:list_id>", methods=["DELETE"])
@login_required
def delete_list(list_id):
    list_to_delete = List.query.filter_by(id=list_id).first()

    if not list_to_delete:
        return jsonify({"message": "List not found!"}), 404

    db.session.delete(list_to_delete)
    db.session.commit()
    return jsonify({"message": "List deleted successfully!"}), 200


@main.route("/EditList/<int:list_id>", methods=["PUT"])
@login_required
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
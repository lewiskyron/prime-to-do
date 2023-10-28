from flask import blueprints
from models import List, Task, User
from flask import jsonify, request
from db_init import db
from flask_login import current_user, login_required

main = blueprints.Blueprint("main", __name__)


@main.route("/GetLists", methods=["GET"])
@login_required
def get_lists():
    """
    Get all the lists associated with the current user.

    This route retrieves all list items belonging to the authenticated user and
    returns them in a JSON format.

    Returns:
        A tuple containing a JSON object of the user's lists and a success 
        status code (200) on success, 
        or an error message and a status code (400) on failure.
    """
    success_message = "Successfully retrieved user's lists from the database."
    failure_message = "Failed to retrieve user's lists from the database."
    success_status = 200

    user_id = current_user.id

    try:
        lists = List.query.filter_by(user_id=user_id).all()
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
    """
    Add a new list for the current user.

    This route creates a new list with the given name from the request JSON,
    associating it with the currently authenticated user.

    Returns:
        A JSON object containing a success message and a 200 status code on 
        successful addition.
    """
    data = request.get_json()
    new_list = List(name=data["name"], user_id=current_user.id)
    db.session.add(new_list)
    db.session.commit()
    return jsonify({"message": "List added successfully!"}), 200


@main.route("/DeleteList/<int:list_id>", methods=["DELETE"])
@login_required
def delete_list(list_id):
    """
    Delete a specific list based on the list ID.

    Args:
        list_id (int): The unique identifier of the list to be deleted.

    Returns:
        A JSON response indicating successful deletion or an error message if 
        the list is not found.
    """
    list_to_delete = List.query.filter_by(id=list_id).first()

    if not list_to_delete:
        return jsonify({"message": "List not found!"}), 404

    db.session.delete(list_to_delete)
    db.session.commit()
    return jsonify({"message": "List deleted successfully!"}), 200


@main.route("/EditList/<int:list_id>", methods=["PUT"])
@login_required
def edit_list(list_id):
    """
    Edit the properties of a specific list.

    Args:
        list_id (int): The unique identifier of the list to be edited.

    The function expects a JSON payload with the new values for the list 
    properties.
    Currently, only the 'name' property can be edited.

    Returns:
        A JSON response indicating the successful update or an error message
        if the list is not found.
    """
    data = request.get_json()
    list_to_edit = List.query.filter_by(id=list_id).first()

    if not list_to_edit:
        return jsonify({"message": "List not found!"}), 404

    if 'name' in data:
        list_to_edit.name = data['name']

    db.session.commit()
    return jsonify({"message": "List updated successfully!"}), 200

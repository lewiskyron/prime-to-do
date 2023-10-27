from flask import blueprints
from models import List, Task # noqa
from flask import jsonify, request, make_response# noqa
from db_init import db# noqa

tasks = blueprints.Blueprint("tasks", __name__)


@tasks.route("/GetTasks/<int:list_id>", methods=["GET"])
def get_tasks(list_id):
    try:
        tasks = Task.query.filter_by(list_id=list_id).all()
        success_message = "Successfully retrieved all lists from the database."
        success_status = 200

        # Create a list of dictionaries containing all attributes of each task
        # and a list of subtasks for each task
        print("User retrieved all lists from the database")
        return (
            jsonify(
                {
                    "message": success_message,
                    "tasks": [tasks.to_dict() for tasks in tasks],
                }
            ),
            success_status,
        )

    except Exception as e:
        # Log the exception for debugging
        print(str(e))
        return make_response(jsonify({"error": "An error occurred while fetching the tasks."}), 500)# noqa


@tasks.route("/AddTask/<int:list_id>", methods=["POST"])
def add_task(list_id):
    try:
        data = request.json  # Parse JSON data from the request body
        task_name = data.get("name") 
        list_id = data.get("list_id")  

        if task_name is None:
            return jsonify({"error": "Task name is required."}), 400

        # Create and add the task
        task = Task(name=task_name, list_id=list_id, depth=0)
        db.session.add(task)
        db.session.commit()

        return jsonify({"message": "Task added successfully!"}), 200

    except Exception as e:
        # Log the error message
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred."}), 500
    

@tasks.route("/AddSubtasks", methods=["POST"])
def add_subtask():
    try:
        data = request.json  # Parse JSON data from the request body
        parent_id = data.get("parent_id")  # Replace with the key for the
        subtask_name = data.get("name")  # Replace with the key for the
        subtask_list_id = data.get("list_id")  # Replace with the key for the

        if parent_id is None:
            return jsonify({"error": "Parent_id is required."}), 400

        # Check if the parent_id is valid by fetching the parent task
        parent_task = Task.query.get(parent_id)

        if parent_task is None:
            return jsonify({"error": "Parent task not found."}), 404

        # Create and add the subtask
        subtask = Task(name=subtask_name, list_id=subtask_list_id,
                       parent_id=parent_id)
        db.session.add(subtask)
        db.session.commit()

        # Calculate depth
        subtask.depth = subtask.calculate_depth()
        db.session.commit()

        return jsonify({"message": "Subtask added successfully!"}), 200

    except Exception as e:
        # Handle any exceptions (e.g., JSON parsing errors)
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred."}), 500
    

@tasks.route("/DeleteTask/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    try:
        task_to_delete = Task.query.filter_by(id=task_id).first()

        if not task_to_delete:
            return jsonify({"message": "Task not found!"}), 404

        db.session.delete(task_to_delete)
        db.session.commit()
        return jsonify({"message": "Task deleted successfully!"}), 200

    except Exception as e:
        # Log the exception for debugging
        print(str(e))
        return jsonify({"error": "An error occurred."}), 500
    

@tasks.route("/EditTask/<int:task_id>", methods=["PUT"])
def edit_task(task_id):
    try:
        data = request.json  # Parse JSON data from the request body
        task_to_edit = Task.query.filter_by(id=task_id).first()
        task_name = data.get("name")  # Replace with the key for the
        completed = data.get("completed")  # Replace with the key for the

        if task_to_edit is None:
            return jsonify({"error": "Task not found!"}), 404

        if task_name is not None:
            task_to_edit.name = task_name

        if completed is not None:
            task_to_edit.completed = completed

        db.session.commit()
        return jsonify({"message": "Task edited successfully!"}), 200

    except Exception as e:
        # Log the exception for debugging
        print(str(e))
        return jsonify({"error": "An error occurred."}), 500
from flask import blueprints
from models import List, Task # noqa
from flask import jsonify, request, make_response# noqa
from db_init import db# noqa

tasks = blueprints.Blueprint("tasks", __name__)


@tasks.route("/GetTasks/<int:list_id>", methods=["GET"])
def get_tasks(list_id):
    try:
        tasks = Task.query.filter_by(list_id=list_id).all()
        output = [{"id": task.id, "description": task.description, "list_id": task.list_id} for task in tasks]  # noqa
        return jsonify({"tasks": output}), 200
    except Exception as e:
        # Log the exception for debugging
        print(str(e))
        return make_response(jsonify({"error": "An error occurred while fetching the tasks."}), 500)# noqa
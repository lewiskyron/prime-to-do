from flask import blueprints
from models import List, Task # noqa
from flask import jsonify, request, make_response# noqa
from db_init import db# noqa

tasks = blueprints.Blueprint("tasks", __name__)


@tasks.route("/GetTasks/<int:list_id>", methods=["GET"])
def get_tasks(list_id):
    try:
        tasks = Task.query.filter_by(list_id=list_id).all()

        # Create a list of dictionaries containing all attributes of each task
        # and a list of subtasks for each task
        output = []
        for task in tasks:
            task_data = {
                "id": task.id,
                "name": task.name,
                "parent_id": task.parent_id,
                "list_id": task.list_id,
                "depth": task.get_depth(),
            }

            # Fetch and add subtasks to the task data
            subtasks = task.subtasks
            subtask_data = [{
                "id": subtask.id,
                "name": subtask.name,
                "parent_id": subtask.parent_id,
                "list_id": subtask.list_id,
                "depth": task.get_depth(),
            } for subtask in subtasks]

            task_data["subtasks"] = subtask_data
            output.append(task_data)

        return jsonify({"tasks": output}), 200
    except Exception as e:
        # Log the exception for debugging
        print(str(e))
        return make_response(jsonify({"error": "An error occurred while fetching the tasks."}), 500)# noqa


@tasks.route("/AddTask", methods=["POST"])
def test_get_tasks():
    task1 = Task(name='Task 1', list_id=1, depth=0)
    task2 = Task(name='Task 2', list_id=1, depth=0)
    task3 = Task(name='Task 3', list_id=1, depth=0)

    db.session.add_all([task1, task2, task3])
    db.session.commit()

    return jsonify({"message": "List added successfully!"}), 200


@tasks.route("/AddSubtasks", methods=["POST"])
def add_subtasks(parent_id=5):
    
    subtask1 = Task(name='Subtask 2', list_id=1, parent_id=parent_id)
    db.session.add(subtask1)
    db.session.commit()

    # calculate depth
    subtask1.depth = subtask1.calculate_depth()
    db.session.commit()

    return jsonify({"message": "Subtask added successfully!"}), 200

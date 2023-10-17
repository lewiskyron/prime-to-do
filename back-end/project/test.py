from . import db
from .models import List, Task, SubTasks
import json


def import_data():
    with open("project/data.json") as f:
        data = json.load(f)
    return data


def insert_lists(data):
    for list in data:
        list_name = List.query.filter_by(name=list["list_name"]).first()
        if list_name is None:
            list_name = List(name=list["list_name"])
            db.session.add(list_name)
            db.session.commit()
        else:
            print("List already exists")
    return "Data inserted successfully"


def insert_tasks(data):
    for list in data:
        list_name = List.query.filter_by(name=list["list_name"]).first()
        for task in list["tasks"]:
            task_name = Task.query.filter_by(name=task["name"]).first()
            if task_name is None:
                task_name = Task(
                    name=task["name"],
                    list_id=list_name.id,
                )
                db.session.add(task_name)
                db.session.commit()
            else:
                print("Task already exists")
    print(list["tasks"])
    return list["tasks"]


def insert_subtasks(data):
    for list in data:
        for task in list["tasks"]:
            task_name = Task.query.filter_by(name=task["name"]).first()
            for subtask in task["sub_tasks"]:
                subtask_name = SubTasks.query.filter_by(name=subtask["name"]).first()
                if subtask_name is None:
                    subtask_name = SubTasks(
                        name=subtask["name"],
                        parent_id=task_name.id,
                    )
                    db.session.add(subtask_name)
                    db.session.commit()
                else:
                    print("Subtask already exists")
    return "Data inserted successfully"
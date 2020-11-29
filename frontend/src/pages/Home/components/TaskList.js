import React, { useContext } from "react";
import CheckBoxTask from "./CheckBoxTask";
import { IconButton } from "office-ui-fabric-react";
import { HomeContext } from "..";
import api from "../../../services/api";

export const trashIcon = { iconName: "Trash" };

function TaskList({ project }) {
  const { handleRefreshProjects } = useContext(HomeContext);
  const { todo, done } = project.tasks.reduce(
    (total, task) => {
      if (!task.completed) {
        total.todo = [...total.todo, task];
      } else {
        total.done = [...total.done, task];
      }
      return total;
    },
    { todo: [], done: [] }
  );

  function handleDeleteTask(taskId) {
    api
      .delete(`/tasks/${project._id}/${taskId}`)
      .then((response) => {
        handleRefreshProjects();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onChange(ev, isChecked, taskId) {
    if (isChecked) {
      api
        .put(`/tasks/${project._id}`, { taskId, completed: true })
        .then((response) => {
          handleRefreshProjects();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="tasks-container">
      <div>
        <h3>To Do</h3>
        {todo.map((task) => (
          <div key={task._id} className="stack-todo">
            <CheckBoxTask task={task} handleOnChange={onChange} />
            <IconButton
              iconProps={trashIcon}
              title="Delete"
              ariaLabel="Delete"
              onClick={() => handleDeleteTask(task._id)}
            />
          </div>
        ))}
      </div>

      <div>
        <h3>Done</h3>
        {done.map((task) => (
          <CheckBoxTask checked key={task._id} task={task} handleOnChange={onChange} />
        ))}
      </div>
    </div>
  );
}

export default React.memo(TaskList);

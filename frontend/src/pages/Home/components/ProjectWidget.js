import React from "react";
import { IconButton } from "office-ui-fabric-react";
import { useBoolean } from "@uifabric/react-hooks";

import "./ProjectWidget.css";
import DialogUpdate from "./DialogUpdate";
import api from "../../../services/api";
import TaskList from "./TaskList";

export const plusIcon = { iconName: "Add" };
export const editIcon = { iconName: "Edit" };
export const trashIcon = { iconName: "Trash" };

function ProjectWidget({ project, handleChangeProject, refreshProjects }) {
  const [hideModal, { toggle: toggleHideModal }] = useBoolean(true);

  function updateProject(description) {
    toggleHideModal();
    api
      .post("/tasks", { projectId: project._id, description })
      .then((response) => {
        refreshProjects();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="p-widget">
      <div className="p-widget-top">
        <div className="title-widget">
          <span>{project.name}</span>
        </div>
        <div className="icons-widget">
          <IconButton
            iconProps={plusIcon}
            title="Add"
            ariaLabel="Add"
            onClick={() => toggleHideModal()}
          />
          <IconButton
            iconProps={editIcon}
            title="Edit"
            ariaLabel="Edit"
            onClick={() => handleChangeProject("edit", project)}
          />
          <IconButton
            iconProps={trashIcon}
            title="Delete"
            ariaLabel="Delete"
            onClick={() => handleChangeProject("delete", project)}
          />
        </div>
      </div>
      <div className="p-widget-content">
          <TaskList project={project} />
      </div>

      <DialogUpdate
        hideModal={hideModal}
        toggleHideModal={toggleHideModal}
        updateProject={updateProject}
        setProjectToChange={() => {}}
        title={"Add Task"}
        placeholder={"Task Description"}
        buttonText={"Add"}
      />
    </div>
  );
}

export default ProjectWidget;

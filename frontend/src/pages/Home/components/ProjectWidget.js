import React from "react";
import { IconButton } from "office-ui-fabric-react";

import "./ProjectWidget.css";

export const editIcon = { iconName: "Edit" };
export const trashIcon = { iconName: "Trash" };

function ProjectWidget({ project, handleChangeProject }) {
  return (
    <div className="p-widget">
      <div className="p-widget-top">
        <div className="title-widget">
          <span>{project.name}</span>
        </div>
        <div className="icons-widget">
          <IconButton
            iconProps={editIcon}
            title="Edit"
            ariaLabel="Edit"
            onClick={() => handleChangeProject('edit', project)}
          />
          <IconButton
            iconProps={trashIcon}
            title="Delete"
            ariaLabel="Delete"
            onClick={() => handleChangeProject('delete', project)}
          />
        </div>
      </div>
      <div className="p-widget-content"></div>
    </div>
  );
}

export default ProjectWidget;

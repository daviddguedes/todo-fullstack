import React from "react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";

function CheckBoxTask({ checked, task, handleOnChange }) {
  return (
    <div className="checkbox-stack">
      <Checkbox
        disabled={checked}
        checked={checked}
        label={task.description}
        onChange={(ev, isChecked) => handleOnChange(ev, isChecked, task._id)}
      />
    </div>
  );
}

export default CheckBoxTask;

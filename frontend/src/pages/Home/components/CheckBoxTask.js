import React, { useCallback } from "react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { TeachingBubble } from "office-ui-fabric-react/lib/TeachingBubble";
import { useBoolean } from "@uifabric/react-hooks";
import { DirectionalHint } from "office-ui-fabric-react/lib/Callout";

function CheckBoxTask({ checked, task, handleOnChange }) {
  const [
    teachingBubbleVisible,
    { toggle: toggleTeachingBubbleVisible },
  ] = useBoolean(false);

  const terminated = useCallback(() => {
    const full = new Date(task.finishedAt);
    const day = full.getDate();
    const month = full.getMonth();
    const year = full.getFullYear();
    return `${year}-${month}-${day}`;
  }, [task]);

  return (
    <div
      id={`cbox-${task._id}`}
      className="checkbox-stack"
      onClick={() => toggleTeachingBubbleVisible()}
    >
      <Checkbox
        disabled={checked}
        checked={checked}
        label={task.description}
        onChange={(ev, isChecked) => handleOnChange(ev, isChecked, task._id)}
      />

      {teachingBubbleVisible && checked && (
        <TeachingBubble
          hasSmallHeadline={true}
          calloutProps={{ directionalHint: DirectionalHint.leftCenter }}
          target={`#cbox-${task._id}`}
          onDismiss={toggleTeachingBubbleVisible}
          headline={task.description}
        >
          {`Completed on ${terminated()}`}
        </TeachingBubble>
      )}
    </div>
  );
}

export default React.memo(CheckBoxTask);

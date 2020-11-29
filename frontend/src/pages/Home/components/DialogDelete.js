import {
  Dialog,
  DialogType,
  DialogFooter,
} from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react";

const dialogContentProps = {
  type: DialogType.normal,
  title: "Delete Project",
  closeButtonAriaLabel: "Close",
  subText: "Are you sure?",
};

export default function DialogDelete({
  hideDialog,
  toggleHideDialog,
  deleteProject,
  setProjectToChange,
}) {
  return (
    <Dialog
      hidden={hideDialog}
      onDismiss={toggleHideDialog}
      dialogContentProps={dialogContentProps}
    >
      <DialogFooter>
        <PrimaryButton onClick={() => deleteProject()} text="Delete" />
        <DefaultButton
          onClick={() => {
            toggleHideDialog();
            setProjectToChange(null);
          }}
          text="Cancel"
        />
      </DialogFooter>
    </Dialog>
  );
}

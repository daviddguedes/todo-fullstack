import { useEffect, useState } from "react";
import {
  Dialog,
  DialogType,
  DialogFooter,
} from "office-ui-fabric-react/lib/Dialog";
import {
  TextField,
  Stack,
  PrimaryButton,
  DefaultButton,
} from "office-ui-fabric-react";

const modalContentProps = {
  type: DialogType.normal,
  title: "Update Project",
  closeButtonAriaLabel: "Close",
};

export default function DialogUpdate({
  hideModal,
  toggleHideModal,
  updateProject,
  setProjectToChange,
}) {
  const [name, setName] = useState(null);

  useEffect(() => {
    setName(null);
  }, []);

  return (
    <Dialog
      hidden={hideModal}
      onDismiss={toggleHideModal}
      dialogContentProps={modalContentProps}
    >
      <Stack>
        <TextField
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
        />
      </Stack>

      <DialogFooter>
        <PrimaryButton onClick={() => updateProject(name)} text="Update" />
        <DefaultButton
          onClick={() => {
            toggleHideModal();
            setProjectToChange(null);
          }}
          text="Cancel"
        />
      </DialogFooter>
    </Dialog>
  );
}

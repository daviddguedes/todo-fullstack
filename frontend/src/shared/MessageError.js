import { MessageBar, MessageBarType } from "office-ui-fabric-react";

export default function MessageError({ message, onDismiss }) {
  return (
    <MessageBar
      messageBarType={MessageBarType.error}
      isMultiline={false}
      onDismiss={onDismiss}
      dismissButtonAriaLabel="Close"
    >
      {message}
    </MessageBar>
  );
}

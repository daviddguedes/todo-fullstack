import { useCallback, useContext, useEffect, useState } from "react";
import { Stack, TextField, CommandBarButton } from "office-ui-fabric-react";

import { AuthContext } from "../../context/AuthContext";
import history from "../../navigation/history";
import "./Register.css";
import MessageError from "../../shared/MessageError";

const stackTokens = { childrenGap: 50 };
const signinIcon = { iconName: "Signin" };
const registerIcon = { iconName: "ReminderPerson" };
const stackStyles = {
  root: { justifyContent: "center", alignItems: "center", height: "100%" },
};
const columnProps = {
  tokens: { childrenGap: 15 },
};

function Register() {
  const { handleRegister, errorMessage, setErrorMessage } = useContext(
    AuthContext
  );

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setErrorMessage(null);
  }, []);

  function handleOnChange({ target: { value } }, type) {
    setFormData((state) => ({ ...state, [type]: value }));
  }

  const disabledRegister =
    !formData.name || !formData.email || !formData.password;

  function submitRegister() {
    if (disabledRegister) return;

    handleRegister({ ...formData });
  }

  const resetChoice = useCallback(() => setErrorMessage(null), []);

  return (
    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <div className="ct-login">
        <Stack {...columnProps}>
          <TextField
            type="text"
            onChange={(e) => handleOnChange(e, "name")}
            label="Required "
            placeholder="Name"
            required
          />
          <TextField
            type="email"
            onChange={(e) => handleOnChange(e, "email")}
            label="Required "
            placeholder="Email"
            required
          />
          <TextField
            onChange={(e) => handleOnChange(e, "password")}
            label="Required "
            placeholder="Password"
            required
            type="password"
            canRevealPassword
          />
          <Stack horizontal styles={{ root: { height: 44 } }}>
            <CommandBarButton
              onClick={submitRegister}
              iconProps={registerIcon}
              text="REGISTER"
              disabled={disabledRegister}
            />
            <CommandBarButton
              onClick={() => history.push("/login")}
              iconProps={signinIcon}
              text="SIGNIN"
              disabled={false}
            />
          </Stack>
          {errorMessage && <MessageError message={errorMessage} onDismiss={resetChoice} />}
        </Stack>
      </div>
    </Stack>
  );
}

export default Register;

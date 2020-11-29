import { useCallback, useContext, useEffect, useState } from "react";
import { TextField, CommandBarButton } from "office-ui-fabric-react";
import { Stack } from "office-ui-fabric-react/lib/Stack";

import { AuthContext } from "../../context/AuthContext";
import history from "../../navigation/history";
import "./Login.css";
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

function Login() {
  const { handleLogin, errorMessage, setErrorMessage } = useContext(
    AuthContext
  );
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setErrorMessage(null);
  }, []);

  function handleOnChange({ target: { value } }, type) {
    setFormData((state) => ({ ...state, [type]: value }));
  }

  const disabledLogin = !formData.email || !formData.password;

  function submitLogin() {
    if (disabledLogin) return;

    handleLogin({ ...formData });
  }

  const resetChoice = useCallback(() => setErrorMessage(null), []);

  return (
    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <div className="ct-login">
        <Stack {...columnProps}>
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
              onClick={submitLogin}
              iconProps={signinIcon}
              text="SIGNIN"
              disabled={disabledLogin}
            />
            <CommandBarButton
              onClick={() => history.push("/register")}
              iconProps={registerIcon}
              text="REGISTER"
              disabled={false}
            />
          </Stack>
          {errorMessage && <MessageError message={errorMessage} onDismiss={resetChoice} />}
        </Stack>
      </div>
    </Stack>
  );
}

export default Login;

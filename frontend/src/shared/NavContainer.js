import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";

const dropdownStyles = {
  dropdown: { width: "fit-content" },
};

function NavContainer({ user, handleLogout }) {
  return (
    <div className="nav-container">
      <div className="custom-nav">
        <div className="custom-brand">
          <span>EDirectInsure TODO List</span>
        </div>
        <div className="custom-actions">
          <Dropdown
            placeholder={user?.name}
            options={[{ key: "logout", text: "LogOut" }]}
            onChange={handleLogout}
            styles={dropdownStyles}
          />
        </div>
      </div>
    </div>
  );
}

export default NavContainer;

import { createContext, useContext, useEffect, useState } from "react";
import { TextField, Stack, PrimaryButton } from "office-ui-fabric-react";
import { useBoolean } from "@uifabric/react-hooks";

import { AuthContext } from "../../context/AuthContext";
import history from "../../navigation/history";
import api from "../../services/api";
import "./Home.css";
import NavContainer from "../../shared/NavContainer";
import ProjectWidget from "./components/ProjectWidget";
import DialogDelete from "./components/DialogDelete";
import DialogUpdate from "./components/DialogUpdate";

export const HomeContext = createContext({});

function Home() {
  const { user, handleLogout } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [projectToChange, setProjectToChange] = useState(null);
  const [newProject, setNewProject] = useState("");
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [hideModal, { toggle: toggleHideModal }] = useBoolean(true);

  useEffect(() => {
    (async () => {
      if (user) {
        const { data } = await api.get("/projects");
        setProjects(data.projects);
      }
    })();
  }, []);

  if (!user) {
    history.push("/login");
  }

  async function handleRefreshProjects() {
    try {
      const { data } = await api.get("/projects");
      setProjects(data.projects);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreateProject() {
    if (newProject !== "") {
      try {
        const { data } = await api.post("/projects", { name: newProject });
        setProjects((state) => [...state, data.project]);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function updateProject(name) {
    const pIndex = projects.findIndex(
      (project) => project._id === projectToChange._id
    );

    api
      .put(`/projects/${projectToChange._id}`, { name })
      .then((res) => {
        const newState = JSON.parse(JSON.stringify(projects));
        newState[pIndex].name = res.data.updated.name;
        setProjects(newState);
      })
      .catch((error) => {
        console.log(error);
      });
    toggleHideModal();
  }

  function deleteProject() {
    const pIndex = projects.findIndex(
      (project) => project._id === projectToChange._id
    );

    api
      .delete(`/projects/${projectToChange._id}`)
      .then((res) => {
        const newState = JSON.parse(JSON.stringify(projects));
        newState.splice(pIndex, 1);
        setProjects(newState);
      })
      .catch((error) => {
        console.log(error);
      });
    toggleHideDialog();
  }

  function handleChangeProject(action, current) {
    setProjectToChange(current);
    switch (action) {
      case "edit":
        toggleHideModal();
        break;
      case "delete":
        toggleHideDialog();
        break;
      default:
        break;
    }
  }

  return (
    <div className="container">
      <NavContainer user={user} handleLogout={handleLogout} />
      <HomeContext.Provider value={{ handleRefreshProjects }}>
        <div className="content-page">
          <div className="custom-body">
            <div className="projects-container">
              {projects.map((project) => (
                <ProjectWidget
                  key={project._id}
                  project={project}
                  handleChangeProject={(action, current) =>
                    handleChangeProject(action, current)
                  }
                  refreshProjects={handleRefreshProjects}
                />
              ))}
            </div>
            <div className="project-form">
              <Stack tokens={{ childrenGap: 10 }}>
                <span>Create a new Project</span>
                <TextField
                  onChange={({ target: { value } }) => setNewProject(value)}
                  placeholder="Project name"
                />
                <PrimaryButton
                  text="Create Project"
                  onClick={() => handleCreateProject()}
                  allowDisabledFocus
                  disabled={newProject === ""}
                  checked={false}
                />
              </Stack>
            </div>
          </div>
        </div>

        <DialogDelete
          hideDialog={hideDialog}
          toggleHideDialog={toggleHideDialog}
          deleteProject={deleteProject}
          setProjectToChange={setProjectToChange}
        />

        <DialogUpdate
          hideModal={hideModal}
          toggleHideModal={toggleHideModal}
          updateProject={updateProject}
          setProjectToChange={setProjectToChange}
          title={"Update Project"}
          placeholder={"Project Name"}
          buttonText={"Update"}
        />
      </HomeContext.Provider>
    </div>
  );
}

export default Home;

import React from "react";
import "./../App.css";
import { Grid, TextField, Button, InputAdornment } from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const navigate = useNavigate();

  const [projectID, setProjectID] = React.useState<String>("projectid");
  const [projectTitle, setProjectTitle] =
    React.useState<String>("projecttitle");
  const [description, setDescription] = React.useState<String>("description");
  const [usersList, setUsersList] = React.useState<String>("userslist");

  function handleCreateProject() {
    console.log("you clicked create project!");
  }

  function handleChange_id(event: any) {
    setProjectID(event.target.value);
  }

  function handleChange_title(event: any) {
    setProjectTitle(event.target.value);
  }

  function handleChange_description(event: any) {
    setDescription(event.target.value);
  }

  function handleChange_userslist(event: any) {
    setUsersList(event.target.value);
  }

  function fetch_create_project() {

    const data = {
      projectID: projectID,
      projectTitle: projectTitle,
      projectDescription: description,
      usersList: usersList,
    };

    fetch("/createProjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error);
          console.log(error.response.statuts);
          console.log(error.response.headers);
        }
      });
  }

  /**
   * UI for Create Project Page
   */
  return (
    <div className="App">
      <div>
        <div>
          <h1>Create A Project</h1>
          <Grid
            container
            justifyContent="center"
            style={{ marginBottom: "0px" }}
          >
            <img
              src="http://cdn.onlinewebfonts.com/svg/img_85305.png"
              alt="create project icon"
              width={200}
            ></img>
          </Grid>
          <div style={{ paddingTop: 20 }}>
            <Grid
              container
              justifyContent="center"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid
                item
                spacing={2}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <h2
                  style={{
                    marginBottom: "0px",
                    marginRight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Title
                </h2>
                <TextField
                  onChange={handleChange_title}
                  margin="normal"
                  fullWidth
                >
                  {" "}
                </TextField>
              </Grid>
              <Grid
                item
                spacing={2}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <h2
                  style={{
                    marginBottom: "0px",
                    marginRight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Project ID
                </h2>
                <TextField onChange={handleChange_id} margin="normal" fullWidth>
                  {" "}
                </TextField>
              </Grid>

              <Grid
                item
                spacing={2}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <h2
                  style={{
                    marginBottom: "0px",
                    marginRight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Description
                </h2>
                <TextField
                  onChange={handleChange_description}
                  margin="normal"
                  fullWidth
                >
                  {" "}
                </TextField>
              </Grid>
              <Grid
                item
                spacing={2}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <h2
                  style={{
                    marginBottom: "0px",
                    marginRight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Other Users
                </h2>
                <TextField
                  onChange={handleChange_userslist}
                  margin="normal"
                  fullWidth
                >
                  {" "}
                </TextField>
              </Grid>
            </Grid>
            <div style={{ paddingTop: 40 }}></div>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/projects")}
                >
                  {" "}
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                {" "}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateProject}
                >
                  {" "}
                  Create Project
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;

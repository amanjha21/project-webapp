import "./EditProfile.css";
import { useState } from "react";
import EditProfileFormInput from "./EditProfileFormInput";
import Confirmation from "../../Confirmation";

const EditProfile = () => {
  const getFormData = (e) => {
    const data = new FormData(e.target);
    return Object.fromEntries(data.entries());
  };
  const resetForm = (e) => {
    e.target.reset();
    const inputs = e.target.getElementsByTagName("input");
    for (let input of inputs) {
      input.setAttribute("focused", "false");
    }
  };
  const generalHandler = (e) => {
    e.preventDefault();
    const data = getFormData(e);
    console.log("general", data);
    resetForm(e);
  };
  const passwordHandler = (e) => {
    e.preventDefault();
    const data = getFormData(e);
    console.log("password", data);
    resetForm(e);
  };

  const deletePostsHandler = (e) => {
    e.preventDefault();
    setShowDeletePosts(true);
    const data = getFormData(e);
    console.log("deletePosts", data);
    resetForm(e);
  };

  const deleteProfileHandler = (e) => {
    e.preventDefault();
    setShowDeleteProfile(true);
    const data = getFormData(e);
    console.log("deleteProfile", data);
    resetForm(e);
  };

  const [formInputs, setFormInputs] = useState({
    name: "",
    oldpassword: "",
    newPassword: "",
  });

  const formInputChangeHandler = (e) => {
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };

  const generalFormInputs = [
    {
      name: "name",
      type: "text",
      errorMessage: "Username must be atleast 3 characters",
      placeholder: "Name",
      pattern: "[A-Za-z ]{3,100}",
    },
  ];
  const passwordFormInputs = [
    {
      name: "oldPassword",
      type: "password",
      placeholder: "Old Password",
      errorMessage: "Incorrect Password",
    },
    {
      name: "newPassword",
      type: "password",
      placeholder: "New Password",
      errorMessage:
        "Password must be 8 to 16 digits and must contain atleast one capital letter, number and special character",
      pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$",
    },
    {
      name: "repeatPassword",
      type: "password",
      placeholder: "Repeat Password",
      errorMessage: "Both passwords must be same",
      pattern: formInputs.newPassword,
    },
  ];
  const deletePostsFormInputs = [
    {
      name: "Password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Incorrect Password",
    },
  ];
  const deleteProfileFormInputs = [
    {
      name: "Password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Incorrect Password",
    },
  ];

  const [openTab, setOpenTab] = useState(0);
  const [showDeletePosts, setShowDeletePosts] = useState(false);
  const [showDeleteProfile, setShowDeleteProfile] = useState(false);
  return (
    <>
      <div className="settings-container">
        <div className="left-column">
          <ul>
            <li onClick={() => setOpenTab(0)}>
              <label>General</label>
            </li>

            <li onClick={() => setOpenTab(1)}>
              <label>Change Password</label>
            </li>

            <li onClick={() => setOpenTab(2)}>
              <label>Delete Posts</label>
            </li>

            <li onClick={() => setOpenTab(3)}>
              <label>Delete profile</label>
            </li>
          </ul>
        </div>
        <div className="settings-tab">
          {openTab === 0 && (
            <form onSubmit={generalHandler}>
              <h1>General account Settings</h1>
              <div className="input-group">
                {generalFormInputs.map((input, i) => (
                  <EditProfileFormInput
                    {...input}
                    key={i}
                    onChange={formInputChangeHandler}
                  />
                ))}
              </div>

              <button className="button-changes button-save-changes">
                Save Change
              </button>
            </form>
          )}
          {openTab === 1 && (
            <form onSubmit={passwordHandler}>
              <h1>Change password</h1>
              <div className="input-group">
                {passwordFormInputs.map((input, i) => (
                  <EditProfileFormInput
                    {...input}
                    key={i}
                    onChange={formInputChangeHandler}
                  />
                ))}
              </div>
              <button className="button-changes button-save-changes">
                Save Change
              </button>
            </form>
          )}

          {openTab === 2 && (
            <form onSubmit={deletePostsHandler}>
              <h1>Delete ALL your post</h1>
              <h2>
                Are you sure you want to delete ALL your posts ?<br /> All your
                Posts will be deleted...
              </h2>
              <div className="input-group">
                {deletePostsFormInputs.map((input, i) => (
                  <EditProfileFormInput
                    {...input}
                    key={i}
                    onChange={formInputChangeHandler}
                  />
                ))}
              </div>
              <button className="button-changes button-confirm">Confirm</button>
            </form>
          )}

          {openTab === 3 && (
            <form onSubmit={deleteProfileHandler}>
              <h1>Delete your profile</h1>
              <h2>
                Are you sure you want to delete your profile ?<br /> All your
                data will be lost...
              </h2>
              <div className="input-group">
                {deleteProfileFormInputs.map((input, i) => (
                  <EditProfileFormInput
                    {...input}
                    key={i}
                    onChange={formInputChangeHandler}
                  />
                ))}
              </div>
              <button className="button-changes button-confirm">Confirm</button>
            </form>
          )}
        </div>
      </div>
      <Confirmation
        visible={showDeletePosts}
        setVisible={setShowDeletePosts}
        message="Are you sure you want to delete all your posts?"
        option="Delete"
        onConfirm={() => console.log("post delete confirmed")}
      />
      <Confirmation
        visible={showDeleteProfile}
        setVisible={setShowDeleteProfile}
        message="Are you sure you want to delete your profile?"
        option="Delete"
        onConfirm={() => console.log("post delete confirmed")}
      />
    </>
  );
};

export default EditProfile;

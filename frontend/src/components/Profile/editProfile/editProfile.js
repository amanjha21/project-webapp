import "./editProfile.css";
import { useState } from "react";
import EditProfileFormInput from "./EditProfileFormInput";

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
  const deleteProfileHandler = (e) => {
    e.preventDefault();
    const data = getFormData(e);
    console.log("forgot password", data);
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
  const deleteProfileFormInputs = [
    {
      name: "Password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Incorrect Password",
      pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$",
    },
  ];

  const [openTab, setOpenTab] = useState(0);
  return (
    <>
      <div className="settings-container">
        <div className="left-column">
          <ul>
            <li onClick={() => setOpenTab(0)}>
              <label>General</label>
            </li>
            <li onClick={() => setOpenTab(1)}>
              <label>Password</label>
            </li>

            <li onClick={() => setOpenTab(2)}>
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
    </>
  );
};

export default EditProfile;

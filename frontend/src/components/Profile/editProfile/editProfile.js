import "./editProfile.css";
import { useState } from "react";

const EditProfile = () => {
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
            <form>
              <h1>General account Settings</h1>
              <div className="input-group">
                <input className="new-input" name="name" type="text" />
                <label>Name</label>
              </div>

              <button className="default--btn button-save-changes">
                Save Change
              </button>
            </form>
          )}
          {openTab === 1 && (
            <form>
              <h1>Change password</h1>
              <div className="input-group">
                <input className="new-input" type="password" />
                <label>Old Password</label>
              </div>
              <div className="input-group">
                <input className="new-input" type="password" />
                <label>New Password</label>
              </div>
              <div className="input-group">
                <input className="new-input" type="password" />
                <label>New Password Confirmation</label>
              </div>
              <button className="default--btn button-save-changes">
                Save Change
              </button>
            </form>
          )}

          {openTab === 2 && (
            <form>
              <h1>Delete your profile</h1>
              <h2>
                Are you sure you want to delete your profile ?<br /> All your
                data will be lost...
              </h2>
              <div className="input-group">
                <input className="new-input" type="password" />
                <label>Password</label>
              </div>
              <button className="default--btn button-confirm">Confirm</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProfile;

import "./EditProfileImage.css";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";

const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload circle cursor">
    <div className="img-wrap img-upload">
      <img className="upload-img" htmlFor="photo-upload" src={src} />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
);

const Edit = ({ children, deleted, saved }) => (
  <div className="card">
    <form className="card-form">
      <h1>Edit Profile</h1>
      {children}
      <button className="card-form-btn button--delete" onClick={deleted}>
        <BsTrash />
      </button>
      <button className="card-form-btn button--save" onClick={saved}>
        Save
      </button>
    </form>
  </div>
);

const EditProfileImage = ({ profileImage }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(profileImage);

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const newFile = e.target.files[0];
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    if (newFile) {
      reader.readAsDataURL(newFile);
    }
  };

  const saveHandler = (e) => {
    e.preventDefault();
    console.log("Profile Image saved successfully.");
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    setImagePreviewUrl(
      "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
    );
    console.log("Profile Image deleted successfully.");
  };

  return (
    <>
      <div>
        <Edit deleted={deleteHandler} saved={saveHandler}>
          <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
        </Edit>
      </div>
    </>
  );
};

export default EditProfileImage;

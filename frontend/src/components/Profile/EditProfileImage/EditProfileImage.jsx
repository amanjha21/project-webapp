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

const formSubmitHandler = (e) => {
  e.preventDefault();
};

const Edit = ({ children }) => (
  <div className="card">
    <form className="card-form" onSubmit={formSubmitHandler}>
      <h1>Edit Profile</h1>
      {children}
      <button className="card-form-btn button--delete">
        <BsTrash />
      </button>
      <button className="card-form-btn button--save">Save</button>
    </form>
  </div>
);

const EditProfileImage = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
  );

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

  return (
    <>
      <div>
        <Edit>
          <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
        </Edit>
      </div>
    </>
  );
};

export default EditProfileImage;

import "./editProfileImage.css";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";

const ImgUpload = ({ onChange, src }) => (
  <label
    htmlFor="photo-upload"
    className="custom-file-upload circle cursor fas"
  >
    <div className="img-wrap img-upload">
      <img className="upload-img" htmlFor="photo-upload" src={src} />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
);

const Edit = ({ onSubmit, children }) => (
  <div className="card">
    <form className="card-form" onSubmit={onSubmit}>
      <h1>Edit Profile</h1>
      {children}
      <button type="submit" className="default--btn button--delete">
        <BsTrash />
      </button>
      <button type="submit" className="default--btn button--save">
        Save
      </button>
    </form>
  </div>
);

const EditProfileImage = () => {
  const [file, setFile] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
  );

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const newFile = e.target.files[0];
    reader.onloadend = () => {
      setFile(newFile);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(newFile);
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

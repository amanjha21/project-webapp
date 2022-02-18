import "./PostOption.css";
import { MdEdit, MdDelete } from "react-icons/md";
import Popup from "../../Popup";
import DeletePost from "./DeletePost";
import { useState } from "react";
const PostOption = ({ postOptionsVisible }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  return (
    <>
      <div
        className={`post-option-container rounded-corner ${
          postOptionsVisible ? "" : "hide-post-options"
        }`}
      >
        <MdEdit
          className=" post-option post-edit-option"
          onClick={() => setShowEdit(true)}
        />
        <MdDelete
          className="post-option post-delete-option"
          onClick={() => setShowDelete(true)}
        />
      </div>
      <Popup visible={showEdit} setVisible={setShowEdit}>
        <DeletePost />
      </Popup>
      <Popup visible={showDelete} setVisible={setShowDelete}>
        <DeletePost />
      </Popup>
    </>
  );
};

export default PostOption;

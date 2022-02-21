import Options from "../Options";
import { MdEdit, MdDelete } from "react-icons/md";
import Popup from "../Popup";
import Confirmation from "../Confirmation";
import { useState } from "react";
import CreatePost from "./CreatePost/CreatePost";
const PostOptions = ({ text, images }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const deleteConfirmHandler = ({ data }) => {
    console.log("deleted", data);
  };
  return (
    <>
      <Options>
        <MdEdit
          className=" post-option post-edit-option"
          onClick={() => setShowEdit(true)}
        />
        <MdDelete
          className="post-option post-delete-option"
          onClick={() => setShowDelete(true)}
        />
      </Options>
      <Popup visible={showEdit} setVisible={setShowEdit}>
        <CreatePost postText={text} images={images} />
      </Popup>
      <Confirmation
        visible={showDelete}
        setVisible={setShowDelete}
        message="Are you sure you want to delete this post?"
        option="Delete"
        onConfirm={deleteConfirmHandler}
        input={{ placeholder: "Password" }}
      />
    </>
  );
};

export default PostOptions;

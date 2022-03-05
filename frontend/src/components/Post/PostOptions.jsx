import Options from "../Options";
import { MdEdit, MdDelete } from "react-icons/md";
import Popup from "../Popup";
import Confirmation from "../Confirmation";
import { useState } from "react";
import CreatePost from "./CreatePost/CreatePost";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import { authHeader } from "../../helpers/authHeader";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/post";
const PostOptions = ({ text, images, postUserId, postId }) => {
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const deleteConfirmHandler = () => {
    axios
      .delete(`${SERVER_ENDPOINT}/post/${postId}`, {
        headers: { "Content-Type": "multipart/form-data", ...authHeader() },
      })
      .then((res) => {
        console.log(res.data);
        setShowDelete(false);
        dispatch(getPosts());
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };
  const onUpdateConfirm = () => {
    setShowEdit(false);
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
        <CreatePost
          postText={text}
          images={images}
          postId={postId}
          onUpdateConfirm={onUpdateConfirm}
        />
      </Popup>
      <Confirmation
        visible={showDelete}
        setVisible={setShowDelete}
        message="Are you sure you want to delete this post?"
        option="Delete"
        onConfirm={deleteConfirmHandler}
      />
    </>
  );
};

export default PostOptions;

import "./DeletePost.css";
const DeletePost = ({ setShowDelete }) => {
  return (
    <>
      <div className="delete-post-container rounded-corner">
        <div>Are you sure you want to delete this post?</div>
        <button className="delete-post-button">Delete</button>
        <button
          className="post-cancel-button"
          onClick={() => setShowDelete(false)}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default DeletePost;

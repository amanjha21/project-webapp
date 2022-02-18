import "./DeletePost.css";
const DeletePost = () => {
  return (
    <>
      <div className="delete-post-container rounded-corner">
        <div>Are you sure you want to delete this post?</div>
        <button className="delete-post-button">Delete</button>
      </div>
    </>
  );
};

export default DeletePost;

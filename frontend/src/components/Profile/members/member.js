import Options from "../../Options";
import { MdEdit, MdDelete } from "react-icons/md";

const Member = ({ name, imgUrl, role = "member" }) => {
  return (
    <>
      <div className="member-list-container">
        <div className="main--team">
          <section className="has-top-border"></section>
          <section className="member-container">
            <ul className={`member-list ${role.toLowerCase()}`}>
              <li>
                <div className="member-avatar">
                  <img className="circle" src={imgUrl} alt="" />
                </div>
                <div className="member-meta">
                  <span className="name cursor">{name}</span>
                  <span className="role">{role}</span>
                </div>
              </li>
            </ul>
            <Options className="">
              <button className="post-option">Admin</button>
              <button className="post-option">Ad</button>
              <button className="post-option">min</button>
              <MdDelete className="post-option post-delete-option" />
            </Options>
          </section>
        </div>
      </div>
    </>
  );
};

export default Member;

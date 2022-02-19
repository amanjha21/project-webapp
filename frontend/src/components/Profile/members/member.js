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
                  <span className="name">{name}</span>
                  <span className="role">{role}</span>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default Member;

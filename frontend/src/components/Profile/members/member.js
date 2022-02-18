const Member = ({ name, imgUrl, role = "member" }) => {
  return (
    <>
      <div className="container">
        <div className="main--team">
          <section>
            <ul className="numbers admin">
              <li>
                <div className="number-avatar">
                  <img className="circle" src={imgUrl} alt="" />
                </div>
                <div className="number-meta">
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

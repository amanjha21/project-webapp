const SingleTeam = ({ imgUrl, name, onClick }) => {
  return (
    <>
      <div className="team-user">
        <img src={imgUrl} className="circle" />
        <div className="team-user-details">
          <div className="team-user-name">{name}</div>
        </div>
      </div>
    </>
  );
};

export default SingleTeam;

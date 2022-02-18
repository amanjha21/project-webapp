const UserSettings = () => {
  const options = ["First Option", "Second Option", "Third Option"];
  return (
    <div className="user-settings-container rounded-corner">
      {options &&
        options.map((option, i) => (
          <div className="user-settings-option" key={i}>
            {" "}
            {option}
          </div>
        ))}
    </div>
  );
};

export default UserSettings;

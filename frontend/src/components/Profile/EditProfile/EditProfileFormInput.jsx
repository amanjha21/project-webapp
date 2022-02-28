import { useState } from "react";

const EditProfileFormInput = ({ errorMessage, ...otherProps }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="input-group">
      <input
        className="new-input"
        {...otherProps}
        onBlur={() => setFocused(true)}
        focused={focused.toString()}
        required
      />
      <span className="edit-profile-error">*{errorMessage}</span>
    </div>
  );
};

export default EditProfileFormInput;

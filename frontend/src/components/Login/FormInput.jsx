import { useState } from "react";

const FormInput = ({ errorMessage, ...otherProps }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <input
        {...otherProps}
        onBlur={() => setFocused(true)}
        focused={focused.toString()}
        required
      />
      <span className="login-form-error">*{errorMessage}</span>
    </div>
  );
};

export default FormInput;

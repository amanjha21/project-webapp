const FormInput = ({ error, ...otherProps }) => {
  return (
    <>
      <input {...otherProps} />
      {error && <span className="error">*{error}</span>}
    </>
  );
};

export default FormInput;

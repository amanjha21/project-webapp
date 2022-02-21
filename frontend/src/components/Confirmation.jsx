import "./Confirmation.css";
import Popup from "./Popup";
const Confirmation = ({
  visible,
  setVisible,
  message,
  option,
  onConfirm,
  input = {},
}) => {
  const getFormData = (e) => {
    const data = new FormData(e.target);
    return Object.fromEntries(data.entries());
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const data = getFormData(e);
    onConfirm({ data: data.confirmInput });
  };
  return (
    <>
      <Popup visible={visible} setVisible={setVisible}>
        <div className="confirmation-message-container rounded-corner">
          <div>{message}</div>
          {input.placeholder ? (
            <form
              onSubmit={formSubmitHandler}
              className="confirm-form-container"
            >
              <textarea
                name="confirmInput"
                className="confirm-form-input"
                rows="1"
                placeholder={input.placeholder ? input.placeholder : ""}
                required
              ></textarea>
              <button className="confirmation-message-button">{option}</button>
            </form>
          ) : (
            <button className="confirmation-message-button" onClick={onConfirm}>
              {option}
            </button>
          )}
          <button
            className="confirmation-cancel-button"
            onClick={() => setVisible(false)}
          >
            Cancel
          </button>
        </div>
      </Popup>
    </>
  );
};

export default Confirmation;

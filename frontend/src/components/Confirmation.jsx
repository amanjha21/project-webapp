import "./Confirmation.css";
import Popup from "./Popup";
const Confirmation = ({ visible, setVisible, message, option, onConfirm }) => {
  return (
    <>
      <Popup visible={visible} setVisible={setVisible}>
        <div className="confirmation-message-container rounded-corner">
          <div>{message}</div>
          <button className="confirmation-message-button" onClick={onConfirm}>
            {option}
          </button>
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

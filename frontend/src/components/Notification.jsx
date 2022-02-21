import "./Popup.css";
import { MdClose } from "react-icons/md";
const Notification = ({ children, visible, setVisible }) => {
  const closeHandler = (e) => {
    if (e.target.classList.value === "Notification-fullscreen-container") {
      setVisible(false);
    }
  };
  return (
    <>
      {visible && (
        <div
          className="notification-fullscreen-container"
          onClick={closeHandler}
        >
          <MdClose
            className="notification-close"
            onClick={() => setVisible(false)}
          />
          <div className="notification-container">{children}</div>
        </div>
      )}
    </>
  );
};

export default Notification;

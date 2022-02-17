import "./Popup.css";
import { MdClose } from "react-icons/md";
const Popup = ({ children, visible, setVisible }) => {
  const closeHandler = (e) => {
    if (e.target.classList.value === "popup-fullscreen-container") {
      setVisible(false);
    }
  };
  return (
    <>
      {visible && (
        <div className="popup-fullscreen-container" onClick={closeHandler}>
          <MdClose className="popup-close" onClick={() => setVisible(false)} />
          <div className="popup-container">{children}</div>
        </div>
      )}
    </>
  );
};

export default Popup;

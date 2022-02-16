import "./Popup.css";
import { MdClose } from "react-icons/md";
const Popup = ({ children, visible, setVisible }) => {
  return (
    <>
      {visible && (
        <div
          className="popup-fullscreen-container"
          onClick={() => setVisible(false)}
        >
          <MdClose className="popup-close" onClick={() => setVisible(false)} />
          <div className="popup-container">{children}</div>
        </div>
      )}
    </>
  );
};

export default Popup;

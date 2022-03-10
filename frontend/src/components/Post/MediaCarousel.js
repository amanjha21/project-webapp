import ImageGallery from "react-image-gallery";
import { MdFileDownload } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import "./MediaCarousel.css";
const MediaCarousel = ({ images, currentIndex }) => {
  const onErrorImageUrl = "/errorImg.jpg";
  const getCurrentIndex = useRef(null);
  const [display, setDisplay] = useState("none");
  const showDownload = () => {
    setDisplay("block");
  };
  const hideDownload = () => {
    setDisplay("none");
  };
  const downloadImage = async () => {
    const currentIndex = getCurrentIndex.current.state.currentIndex;
    const url = images[currentIndex].original;
    const data = await toDataURL(url);
    const imgData = data.url;
    if (!imgData) return;
    let a = document.createElement("a");
    a.href = imgData;
    a.download = url.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const downloadController = () => {
    return (
      <button
        type="button"
        className="image-gallery-icon image-gallery-right-download"
        aria-label="Previous Slide"
        style={{ display }}
        onMouseOver={showDownload}
      >
        <MdFileDownload onClick={downloadImage} />
      </button>
    );
  };
  const closeCarouselHandler = () => {
    getCurrentIndex.current.toggleFullScreen();
  };
  return (
    <>
      <ImageGallery
        showPlayButton={false}
        showFullscreenButton={false}
        useBrowserFullscreen={false}
        lazyLoad={true}
        showThumbnails={false}
        items={images}
        showBullets={true}
        //   showNav={false}
        onErrorImageURL={onErrorImageUrl}
        onMouseOver={showDownload}
        onMouseLeave={hideDownload}
        renderCustomControls={downloadController}
        ref={getCurrentIndex}
        originalAlt="Post Media"
        onClick={closeCarouselHandler}
      />
    </>
  );
};

const toDataURL = (url) => {
  const data = fetch(url)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      return { url, blob };
    })
    .catch(() => {
      return false;
    });
  return data;
};

export default MediaCarousel;
export { toDataURL };

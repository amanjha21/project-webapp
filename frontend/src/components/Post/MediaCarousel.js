import ImageGallery from "react-image-gallery";

const MediaCarousel = ({ images }) => {
  const onErrorImageUrl = "/errorImg.jpg";
  return (
    <ImageGallery
      showPlayButton={false}
      useBrowserFullscreen={false}
      lazyLoad={true}
      showThumbnails={false}
      items={images}
      showBullets={true}
      //   showNav={false}
      onErrorImageURL={onErrorImageUrl}
    />
  );
};

export default MediaCarousel;

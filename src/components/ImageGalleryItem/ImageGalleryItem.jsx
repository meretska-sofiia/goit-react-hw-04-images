import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  const handleSetUrl = () => {
    onClick(largeImageURL);
  };

  return (
    <li className="ImageGalleryItem">
      <img src={webformatURL} alt="" onClick={handleSetUrl} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func,
};

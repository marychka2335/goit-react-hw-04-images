import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ itemData, openModal }) => {
  const { webformatURL, tags, largeImageURL } = itemData;

  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={() => openModal(largeImageURL, tags)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};

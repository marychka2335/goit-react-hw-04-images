import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ closeModal, imgData, imgAlt }) => {
  const handleOverlayClick = evt => {
    const overlay = evt.currentTarget;
    if (evt.target === overlay) {
      closeModal();
    }
  };

  const handleEcsapeKey = evt => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEcsapeKey);
  });

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <img src={imgData} alt={imgAlt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  // imgData: PropTypes.objectOf(PropTypes.object),
imgData: PropTypes.object.isRequired,
};

export default Modal;


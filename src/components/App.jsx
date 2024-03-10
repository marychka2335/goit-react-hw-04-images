import { useState, useEffect } from 'react';
import { fetchGallery } from './API/Api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import * as Scroll from 'react-scroll';
import { Searchbar } from './Searchbar/Seachbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [foundImages, setFoundImages] = useState(null);
  const [currentLargeImg, setCurrentLargeImg] = useState(null);
  const [currentAlt, setCurrentAlt] = useState(null);

  const setInitialParams = search => {
    if (search === '') {
      return iziToast.warning({
        message: 'Enter the search value',
        messageColor: 'white',
        backgroundColor: 'lightred',
        timeout: 1500,
        position: 'topLeft',
      });
    }

    if (searchQuery === search) {
      return;
    }

    setImages([]);
    setSearchQuery(search);
    setPage(1);
  };

  const loadMore = () => {
    setPage(s => s + 1);
  };

  useEffect(() => {
    const addImages = async (searchQuery, page) => {
      try {
        if (!searchQuery) {
          return;
        }
        const data = await fetchGallery(searchQuery, page);
        
        setIsLoading(true);
        setFoundImages(data.totalHits);
        const { hits: newImages, totalHits: foundImages } = data;
  
        setImages(oldImages => [...oldImages, ...newImages]);
  
        if (data.totalHits !== foundImages) {
          setImages({ foundImages });
        }
  
        if (data.totalHits === 0) {
          iziToast.warning({
            message: 'Sorry, no matches in your query',
            messageColor: 'white',
            backgroundColor: 'lightred',
            timeout: 3000,
            position: 'topLeft',
          });
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    addImages(searchQuery, page);
  }, [page, searchQuery]);
  
    const openModal = (src, alt) => {
    setCurrentLargeImg(src);
    setCurrentAlt(alt);
  };

  const closeModal = () => {
    setCurrentLargeImg(null);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={setInitialParams} />
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {isLoading && <Loader />}
      {images.length > 0 && (
        <>
          <ImageGallery items={images} openModal={openModal} />
          {images.length < foundImages && <Button loadMore={loadMore} />}
        </>
      )}
      {currentLargeImg && (
        <Modal closeModal={closeModal} imgData={currentLargeImg} imgAlt={currentAlt} />
      )}
    </div>
  );
};

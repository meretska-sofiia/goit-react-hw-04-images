import { useState, useEffect, useCallback } from 'react';
import ButtonLoadMore from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import fetchPhoto from 'api/request';

export const ImageInfo = ({ searchQuery }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);

  const toggleModal = largeUrl => {
    setShowModal(!showModal);
    setModalUrl(largeUrl);
  };

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchPhoto({
        page: currentPage,
        searchQuery: searchQuery,
      });
      setImages(prev => [...prev, ...response]);
      setCurrentPage(prev => prev + 1);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchImages();
  }, [currentPage, searchQuery, fetchImages]);

  //   const fetchImages = async () => {
  //     console.log(currentPage);
  //     setIsLoading(true);
  //     try {
  //       const response = await fetchPhoto({
  //         page: currentPage,
  //         searchQuery: searchQuery,
  //       });
  //       setImages(prev => [...prev, ...response]);
  //       setCurrentPage(prev => prev + 1);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchImages();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [searchQuery]);

  useEffect(() => {
    if (error) {
      console.log('Warning');
    }
  }, [error]);

  const handleClickLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };
  return (
    <>
      <div>
        <ImageGallery images={images} onClick={toggleModal} />
      </div>
      {images.length % 12 < 1 && images.length > 0 && (
        <ButtonLoadMore onClick={handleClickLoadMore} />
      )}
      <Loader loading={isLoading} />
      {showModal && <Modal url={modalUrl} toggleModal={toggleModal} />}
    </>
  );
};

import React, { useState, useEffect, useRef } from 'react';

import ButtonLoadMore from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import fetchPhoto from 'api/request';

import Loader from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  const onChangeSerchQuery = query => {
    setImages([]);
    setCurrentPage(1);
    setSearchQuery(query);
    setError(null);
  };

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetchPhoto({
        page: currentPage,
        searchQuery: searchQuery,
      });

      setImages(prev => [...prev, ...response]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
      if (!isMounted) setIsMounted(true);
    }
  };

  const toggleModal = largeUrl => {
    setShowModal(!showModal);
    setModalUrl(largeUrl);
  };

  const handleClickLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  useEffect(() => {
    if (searchQuery) {
      fetchImages();
    }
    // eslint-disable-next-line
  }, [searchQuery, currentPage]);

  useEffect(() => {
    if (error) {
      console.log('Warning');
    }
  }, [error]);

  useEffect(() => {
    if (isMounted) {
      containerRef.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
    // eslint-disable-next-line
  }, [images]);

  return (
    <div className="App">
      <SearchBar onSubmit={onChangeSerchQuery} />
      <div>
        <ImageGallery images={images} onClick={toggleModal} />
      </div>
      {images.length % 12 < 1 && images.length > 0 && (
        <ButtonLoadMore onClick={handleClickLoadMore} ref={containerRef} />
      )}
      <Loader loading={isLoading} />
      {showModal && <Modal url={modalUrl} toggleModal={toggleModal} />}
    </div>
  );
};

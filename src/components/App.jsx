import React, { useState, useEffect } from 'react';

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
      setCurrentPage(prev => prev + 1);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = largeUrl => {
    setShowModal(!showModal);
    setModalUrl(largeUrl);
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (error) {
      console.log('Warning');
    }
  }, [error]);
  return (
    <div className="App">
      <SearchBar onSubmit={onChangeSerchQuery} />
      <div>
        <ImageGallery images={images} onClick={toggleModal} />
      </div>
      {images.length % 12 < 1 && images.length > 0 && (
        <ButtonLoadMore onClick={fetchImages} />
      )}
      <Loader loading={isLoading} />
      {showModal && <Modal url={modalUrl} toggleModal={toggleModal} />}
    </div>
  );
};

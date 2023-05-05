import { Searchbar } from './Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { fetchImg } from 'api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import toast, { Toaster } from 'react-hot-toast';
import { StyledLayout } from './Layout/Layout.styled';

const ERROR_MSG = 'Something went wrong, try again';

export const App = () => {
  const [image, setImage] = useState('');
  const [page, setPage] = useState(1);
  const [hitsImg, setHitsImg] = useState(null);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (image === '') {
      return;
    }
    async function getImages() {
      try {
        if (page === 1) {
          setLoading(true);
          setHitsImg(null);
          const { hits, totalHits } = await fetchImg(image, page);
          setHitsImg(hits);
          setTotal(totalHits);
        } else {
          setLoading(true);
          const { hits } = await fetchImg(image, page);
          setHitsImg(prevState => [...prevState, ...hits]);
        }
      } catch (error) {
        setError(ERROR_MSG);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [image, page]);

  const handleFormSubmit = imgName => {
    setImage(imgName);
  };
  const loadMoreImg = () => {
    setPage(prevPage => prevPage + 1);
    if (hitsImg !== null && hitsImg.length === total) {
      toast("We're sorry, but you've reached the end of search results.");
    }
  };

  const resetPage = () => {
    setPage(1);
  };

  return (
    <StyledLayout>
      <Searchbar onSubmit={handleFormSubmit} resetPage={resetPage} />
      {error && <div>{error}</div>}
      {hitsImg !== null && <ImageGallery hits={hitsImg} />}

      {hitsImg !== null && hitsImg.length <= total && (
        <Button loadImg={loadMoreImg} />
      )}
      <Toaster />
      {loading && <Loader />}
    </StyledLayout>
  );
};

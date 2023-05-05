import { ImgModal } from 'components/Modal/ImgModal';
import { useState } from 'react';
import { StyledGalleryImg, StyledGalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ hit }) => {
  const [selectedImg, setSelectedImg] = useState(null);

  const { webformatURL, tags, largeImageURL } = hit;

  const settleSelectedImg = () => {
    setSelectedImg(webformatURL);
  };
  const closeModal = () => {
    setSelectedImg(null);
  };

  return (
    <StyledGalleryItem>
      <StyledGalleryImg
        src={webformatURL}
        alt={tags}
        onClick={settleSelectedImg}
      />
      <ImgModal
        isOpen={selectedImg !== null}
        largeImageURL={largeImageURL}
        tags={tags}
        closeModal={closeModal}
      />
    </StyledGalleryItem>
  );
};

import { ImageGalleryList } from './ImageGallery.styled.js';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem.js';

export const ImageGallery = ({ hits }) => {
  return (
    <div>
      <ImageGalleryList className="gallery">
        {hits.map(({ id, largeImageURL, webformatURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        ))}
      </ImageGalleryList>
    </div>
  );
};

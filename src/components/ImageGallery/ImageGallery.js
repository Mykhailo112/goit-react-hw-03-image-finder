import { ImageGalleryList } from './ImageGallery.styled.js';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem.js';

export const ImageGallery = ({ items }) => (
  <ImageGalleryList>
    {items.map(item => (
      <ImageGalleryItem key={item.id} item={item}></ImageGalleryItem>
    ))}
  </ImageGalleryList>
);

import { Modal } from '../Modal/Modal.js';
import { Component } from 'react';
import {
  ImageGalleryLi,
  ImageGalleryLiImg,
} from './ImageGalleryItem.styled.js';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  onModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  render() {
    const item = this.props;
    const { webformatURL } = item;
    return (
      <ImageGalleryLi>
        <ImageGalleryLiImg
          onClick={this.onModal}
          src={webformatURL}
          alt="img"
        />
        {this.state.showModal && <Modal onClose={this.onClose} image={item} />}
      </ImageGalleryLi>
    );
  }
}

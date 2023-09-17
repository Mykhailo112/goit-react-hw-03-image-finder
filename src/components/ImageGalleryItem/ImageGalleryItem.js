import Modal from 'react-modal';
import { Component } from 'react';
import {
  ImageGalleryLi,
  ImageGalleryLiImg,
} from './ImageGalleryItem.styled.js';

// export class ImageGalleryItem extends Component {
//   state = {
//     showModal: false,
//   };
//   onModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };
//   render() {
//     const { item } = this.props;
//     const { webformatURL } = item;
//     return (
//       <ImageGalleryLi>
//         <ImageGalleryLiImg
//           onClick={this.onModal}
//           src={webformatURL}
//           alt="img"
//         />
//         {this.state.showModal && <Modal onClose={this.onClose} image={item} />}
//       </ImageGalleryLi>
//     );
//   }
// }

Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export class ImageGalleryItem extends Component {
  state = {
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { webformatURL, largeImageURL, tags, id } = this.props;

    return (
      <div>
        <ImageGalleryLi key={id} id={id} onClick={this.openModal}>
          <ImageGalleryLiImg src={webformatURL} alt={tags} />
        </ImageGalleryLi>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <img src={largeImageURL} alt={tags} width={600} height={400} />
        </Modal>
      </div>
    );
  }
}

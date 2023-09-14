import { createPortal } from 'react-dom';
import { Component } from 'react';
const ModalRoot = document.getElementById('modalRoot');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }
  keyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  onOverlayClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    const largeImageURL = this.props.image;
    return createPortal(
      <div onClick={this.onOverlayClose}>
        <div>
          <img src={largeImageURL} alt="img" />
        </div>
      </div>,
      ModalRoot
    );
  }
}

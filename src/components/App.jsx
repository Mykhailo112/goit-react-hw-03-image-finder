import { Component } from 'react';
// import axios from 'axios';
import { fetchImages } from './API/api.js';
import { ButtonLoadMore } from './Button/Button.js';
import { SearchBar } from './SearchBar/SearchBar.js';
import { ImageGallery } from './ImageGallery/ImageGallery.js';
import { Loader } from './Loader/Loader.js';
// import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.js';

let page = 1;

export class App extends Component {
  state = {
    inputData: '',
    items: [],

    status: 'idle',
    totalHits: 0,
  };

  handleSubmit = async inputData => {
    page = 1;
    if (inputData.trim() === '') {
      console.log('You cannot search by empty field, try again.');
      return;
    } else {
      try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await fetchImages(inputData, page);
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          console.log(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          this.setState({
            items: hits,
            inputData,
            totalHits: totalHits,
            status: 'resolved',
          });
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  };
  onNextPage = async () => {
    this.setState({ status: 'pending' });

    try {
      const { hits } = await fetchImages(this.state.inputData, (page += 1));
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };
  render() {
    const { totalHits, status, items } = this.state;
    if (status === 'idle') {
      return (
        <div className="App">
          <SearchBar onSubmit={this.handleSubmit} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className="App">
          <SearchBar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          <Loader />
          {totalHits > 12 && <ButtonLoadMore onClick={this.onNextPage} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className="App">
          <SearchBar onSubmit={this.handleSubmit} />
          <p>Something wrong, try later</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className="App">
          <SearchBar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          {totalHits > 12 && totalHits > items.length && (
            <ButtonLoadMore onClick={this.onNextPage} />
          )}
        </div>
      );
    }
  }
}

import { Component } from 'react';
import { fetchImages } from './API/api.js';
import { ButtonLoadMore } from './Button/Button.js';
import { SearchBar } from './SearchBar/SearchBar.js';
import { ImageGallery } from './ImageGallery/ImageGallery.js';
import { Loader } from './Loader/Loader.js';
import { ErrorMsg } from './App.styled.js';

export class App extends Component {
  state = {
    query: '',
    error: false,
    loading: false,
    prevQuery: '',
    images: [],
    page: 1,
    showLoadMoreButton: true,
    searchFailed: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ loading: true, error: false });

        const { hits, totalHits } = await fetchImages(query, page);

        const filteredNeedsValues = () => {
          this.setState(prevState => ({
            images: [
              ...prevState.images,
              ...hits.map(image => ({
                id: image.id,
                largeImageURL: image.largeImageURL,
                webformatURL: image.webformatURL,
                tags: image.tags,
              })),
            ],
            showLoadMoreButton: false,
          }));
        };

        if (page === Math.ceil(totalHits / 12)) {
          filteredNeedsValues();
          return;
        }

        if (hits.length === 0) {
          this.setState({
            searchFailed: true,
          });
        }

        filteredNeedsValues();
        this.setState({
          showLoadMoreButton: true,
        });
      } catch (error) {
        console.log(error);
        this.setState({
          error: true,
        });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSubmit = query => {
    this.setState({
      prevQuery: this.state.query,
      query: query,
      images: [],
      page: 1,
      error: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, loading, error, showLoadMoreButton, searchFailed } =
      this.state;

    return (
      <div>
        <SearchBar onSubmit={this.handleSubmit} />
        {loading && <Loader />}
        {images.length > 0 && <ImageGallery hits={images} />}
        {searchFailed && images.length === 0 && !loading && (
          <ErrorMsg>
            Such images was not found, try find something else 😉
          </ErrorMsg>
        )}
        {error && !loading && (
          <ErrorMsg>❌ Something went wrong,try reload page</ErrorMsg>
        )}
        {images.length > 0 && showLoadMoreButton && !loading && (
          <ButtonLoadMore loadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}

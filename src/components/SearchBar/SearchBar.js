import { Component } from 'react';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonSpan,
  SearchFormInput,
} from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    inputData: '',
  };
  onChangeInput = e => {
    this.setState({ inputData: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputData);
    this.setState({
      inputData: '',
    });
  };

  render() {
    const inputData = this.state.inputData;
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonSpan>Search</SearchFormButtonSpan>
          </SearchFormButton>

          <SearchFormInput
            onChange={this.onChangeInput}
            name="inputData"
            value={inputData}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Searchbar>
    );
  }
}

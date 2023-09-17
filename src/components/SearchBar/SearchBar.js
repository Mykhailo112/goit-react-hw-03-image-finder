import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './SearchBar.styled';
import { AiOutlineSearch } from 'react-icons/ai';

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();

    const inputValue = `${Date.now()}/${e.target.elements.query.value.trim()}`;
    const sliced = inputValue.split('/');
    const query = sliced[1];

    if (!query) {
      return;
    }

    onSubmit(query);

    e.target.reset();
  };

  return (
    <Searchbar>
      <SearchForm className="form" onSubmit={handleSubmit}>
        <SearchFormInput
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <SearchFormButton type="submit">
          <AiOutlineSearch size={20} />
        </SearchFormButton>
      </SearchForm>
    </Searchbar>
  );
};

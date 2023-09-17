import { BtnWrapper, LoadMoreBtn } from './Button.styled.js';

export const ButtonLoadMore = ({ loadMore }) => {
  return (
    <BtnWrapper>
      <LoadMoreBtn onClick={loadMore} type="button">
        Load more
      </LoadMoreBtn>
    </BtnWrapper>
  );
};

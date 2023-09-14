import { RotatingLines } from 'react-loader-spinner';
import { LoadDiv } from './Loader.styled.js';

export const Loader = () => {
  return (
    <LoadDiv>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </LoadDiv>
  );
};

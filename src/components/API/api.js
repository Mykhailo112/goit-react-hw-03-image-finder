import axios from 'axios';
const keyApi = '38422829-8bf60998ef044b4874e8c64d5';

export async function fetchImages(inputData, page) {
  const searchParams = new URLSearchParams({
    key: keyApi,
    q: inputData,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });
  const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);

  return images.data;
}

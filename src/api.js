import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '34447950-4602eac88cdbfe2314fc4a672';

export const fetchImg = async (value, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  );

  return response.data;
};

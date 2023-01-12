const baseUrl = 'https://api.unsplash.com/';
const accessKey = import.meta.env.VITE_UNSPLASH_API_KEY;

const requestGET = async (url) => {
  const response = await fetch(baseUrl + url);
  return await response.json();
};

export const getRandomPhotoAPI = async () => {
  try {
    const { urls } = await requestGET(`photos/random?client_id=${accessKey}`);
    return urls.regular;
  } catch (error) {
    console.error(error);
  }
};

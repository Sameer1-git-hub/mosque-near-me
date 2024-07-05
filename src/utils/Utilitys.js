import axios from 'axios';

export const post = async (
  url,
  formData = null,
  options = {}
) => {
  try {
    const response = await axios.post(url, formData, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

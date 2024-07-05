import axios from 'axios';

const baseURL = 'https://admin.meandmyteam.org/api';
const axiosClient = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const get = async (url, config = {}) => {
  try {
    const response = await axiosClient.get(url, config);
    if (response.status === 200) {
      return response.data;
    } else {
      throw response;
    }
  } catch (error) {
    console.error('Error in HTTP GET request:', error);
    throw error;
  }
};

export const post = async (url, formData, options = {}) => {
  try {
    const response = await axiosClient.post(url, formData, options);
    return response.data;
  } catch (error) {
    console.error('Error in HTTP POST request:', error);
    throw error;
  }
};

export const put = async (url, formData, options = {}) => {
  try {
    const response = await axiosClient.put(url, formData, options);
    return response.data;
  } catch (error) {
    console.error('Error in HTTP PUT request:', error);
    throw error;
  }
};

export const del = async (url) => {
  try {
    const response = await axiosClient.delete(url);
    return response.data;
  } catch (error) {
    console.error('Error in HTTP DELETE request:', error);
    throw error;
  }
};

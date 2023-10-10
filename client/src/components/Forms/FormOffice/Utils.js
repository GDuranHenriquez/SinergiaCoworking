// api.js

import axios from 'axios';

const API_BASE_URL = 'https://sinergia-coworking.onrender.com';

export const fetchServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/service`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/category`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBuildings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/building`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOffice = async (officeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/office`, officeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

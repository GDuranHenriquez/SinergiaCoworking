// api.js

import axios from 'axios';
const endpoint = import.meta.env.VITE_BASENDPOINT_BACK

export const fetchServices = async () => {
  try {
    const response = await axios.get(`${endpoint}/service`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${endpoint}/category`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBuildings = async () => {
  try {
    const response = await axios.get(`${endpoint}/building`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOffice = async (officeData) => {
  try {
    const response = await axios.post(`${endpoint}/office`, officeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

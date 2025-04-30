import axios from 'axios';

const api = 'https://rickandmortyapi.com/api/character/';

export const getPersonnages = (params = {}) => {
  return axios.get(api, { params });
};

export const personnageById = (id) => {
  return axios.get(`${api}${id}`);
};
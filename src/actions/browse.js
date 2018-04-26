import api from '../api';

export const getFeatured = () => () => api.Browse.getFeatured();
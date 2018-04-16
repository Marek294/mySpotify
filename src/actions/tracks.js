import api from '../api';

export const getUserSavedTracks = () => () => api.Tracks.getUserSavedTracks();
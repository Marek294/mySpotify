import api from '../api';

export const getPlaylist = id => () => api.Playlist.getPlaylist(id);
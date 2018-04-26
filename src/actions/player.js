import api from '../api';

export const currentlyPlaying = () => () => api.Player.currentlyPlaying();

export const recentlyPlayed = () => () => api.Player.recentlyPlayed();

export const getPlayer = () => () => api.Player.getPlayer();

export const play = (body, device_id) => () => api.Player.play(body, device_id);

export const pause = () => () => api.Player.pause();

export const previous = () => () => api.Player.previous();

export const next = () => () => api.Player.next();

export const volume = (volumePercent) => () => api.Player.volume(volumePercent);


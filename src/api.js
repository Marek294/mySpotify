import axios from 'axios';
import config from './config';

const spotify = axios.create({
    baseURL: 'https://api.spotify.com'
})

const auth_server = axios.create({
    baseURL: config.serverBaseUrl
})

export default {
    User: {
        login: () => auth_server.get('/', { withCredentials: true }).then(res => res.data)
    },
    Player: {
        getPlayer: () => spotify.get('/v1/me/player').then(res => res.data),
        currentlyPlaying: () => spotify.get('/v1/me/player/currently-playing').then(res => res.data),
        recentlyPlayed: () => spotify.get('/v1/me/player/recently-played').then(res => res.data),
        play: (body,device_id) => spotify.put(`/v1/me/player/play?device_id=${device_id}`, body),
        pause: () => spotify.put('/v1/me/player/pause'),
        previous: () => spotify.post('/v1/me/player/previous'),
        next: () => spotify.post('/v1/me/player/next'),
        volume: (volume_percent) => spotify.put(`/v1/me/player/volume?volume_percent=${volume_percent}`)
    },
    Tracks: {
        getUserSavedTracks: () => spotify.get('/v1/me/tracks').then(res => res.data)
    },
    Browse: {
        getFeatured: () => spotify.get('/v1/browse/featured-playlists?country=PL&locale=pl_PL').then(res => res.data)
    },
    Playlist: {
        getPlaylist: id => spotify.get(`/v1/users/spotify/playlists/${id}`).then(res => res.data)
    }
}
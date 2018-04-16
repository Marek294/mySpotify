import axios from 'axios';

const spotify = axios.create({
    baseURL: 'https://api.spotify.com'
})

const auth_server = axios.create({
    baseURL: process.env.NODE_ENV ==='production' ? 'https://my-movie-server.herokuapp.com' : 'http://localhost:8888', //192.168.1.200:8888
})

export default {
    User: {
        login: () => auth_server.get('/', { withCredentials: true }).then(res => res.data)
    },
    Player: {
        getPlayer: () => spotify('/v1/me/player').then(res => res.data),
        currentlyPlaying: () => spotify.get('/v1/me/player/currently-playing').then(res => res.data),
        recentlyPlayed: () => spotify.get('/v1/me/player/recently-played').then(res => res.data),
        play: (body) => spotify.put('/v1/me/player/play', body),
        pause: () => spotify.put('/v1/me/player/pause'),
        previous: () => spotify.post('/v1/me/player/previous'),
        next: () => spotify.post('/v1/me/player/next'),
        volume: (volume_percent) => spotify.put(`/v1/me/player/volume?volume_percent=${volume_percent}`)
    },
    Tracks: {
        getUserSavedTracks: () => spotify('/v1/me/tracks').then(res => res.data)
    }
}
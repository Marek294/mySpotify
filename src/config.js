export default {
    serverBaseUrl: process.env.NODE_ENV ==='production' ? 'https://my-movie-server.herokuapp.com' : 'http://localhost:8888'
}
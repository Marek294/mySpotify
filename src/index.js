import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { userLoggedIn } from './actions/auth';
import rootReducer from './rootReducer';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if(localStorage.mySpotifyAccessToken) {
    setAuthorizationToken(localStorage.mySpotifyAccessToken);

    const data = {
        accessToken: localStorage.mySpotifyAccessToken,
        refreshToken: localStorage.mySpotifyRefreshToken
    }

    store.dispatch(userLoggedIn(data));
}

ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();

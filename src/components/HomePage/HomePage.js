import React, { Component } from 'react';
import Background from '../../components/Background/Background';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import config from '../../config';

import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <section className='homepage' >
                <Background />
                <Header />
                <div className='homepage__content'>
                    <h1 className='content__title'>Muzyka bliżej ciebie</h1>
                    <p className='content__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <a href={`${config.serverBaseUrl}/login`}><button className='content__button'>Zaloguj się</button></a>
                </div>
                <Footer />
            </section>
        );
    }
}

export default HomePage;
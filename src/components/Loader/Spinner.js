import React from 'react';

import './Spinner.css';

const Spinner = () => {
    return (
        <div className='spinner'>
            <div className='spinner__rectangle spinner__rectangle--rect1'></div>
            <div className='spinner__rectangle spinner__rectangle--rect2'></div>
            <div className='spinner__rectangle spinner__rectangle--rect3'></div>
            <div className='spinner__rectangle spinner__rectangle--rect4'></div>
            <div className='spinner__rectangle spinner__rectangle--rect5'></div>
        </div>
    );
};

export default Spinner;
import React from 'react';
import classnames from 'classnames';
import Backdrop from '../Backdrop/Backdrop';
import SideBar from '../Sidebar/Sidebar';

import './SideDrawer.css';

const SideDrawer = (props) => {
    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={classnames('sidedrawer', props.open ? 'sidedrawer__open' : 'sidedrawer__close')}>
                <SideBar location={props.location} />
            </div>
        </React.Fragment>
    );
};

export default SideDrawer;
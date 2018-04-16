import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

class Callback extends Component {
    componentDidMount() {
        this.props.login()
            .catch(() => this.props.history.push('/'));
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default connect( null, { login })(Callback);
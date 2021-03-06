import React, { Component } from 'react';

import './Range.css';

class Range extends Component {

    onMouseDown = e => {
        e.preventDefault();

        this.calcValue(e);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    onMouseUp = e => {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);

        if(this.props.onMouseUp) this.props.onMouseUp();
    }

    onMouseMove = e => this.calcValue(e);

    onTouchMove = e => this.calcTouchValue(e);

    onTouchEnd = () => {
        if(this.props.onMouseUp) this.props.onMouseUp();
    }

    calcValue = e => {
        const { range } = this.refs;

        let value;
        if(e.clientX >= range.offsetLeft && e.clientX <= range.offsetLeft+range.offsetWidth) value = parseInt(((e.clientX - range.offsetLeft) / range.offsetWidth ) * this.props.max, 10);
        if(e.clientX < range.offsetLeft) value = 0;
        if(e.clientX > range.offsetLeft+range.offsetWidth) value = this.props.max;
        
        this.props.onChange(value);
    }

    calcTouchValue = e => {
        const { range } = this.refs;

        let value;
        if(e.touches[0].clientX >= range.offsetLeft && e.touches[0].clientX <= range.offsetLeft+range.offsetWidth) value = parseInt(((e.touches[0].clientX - range.offsetLeft) / range.offsetWidth ) * this.props.max, 10);
        if(e.touches[0].clientX < range.offsetLeft) value = 0;
        if(e.touches[0].clientX > range.offsetLeft+range.offsetWidth) value = this.props.max;
        
        this.props.onChange(value);
    }

    render() {
        const { value, max } = this.props;

        const progress__styles = {
            width: (value/max)*100+'%'
        }

        const range__styles = {
            width: this.props.width
        }

        return (
            <div className='range' ref='range' onMouseDown={this.onMouseDown} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} style={range__styles}>
                <div className='range__track'></div>
                <div className='range__thumb'></div>
                <div className='range__progress' style={progress__styles}></div>
            </div>
        );
    }
}

export default Range;
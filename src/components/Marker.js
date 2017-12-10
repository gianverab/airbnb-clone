import React, { Component } from 'react';
import './Marker.css';

class Marker extends Component {
  render() {
    let styles = 'marker';
    if (this.props.selected) {
      styles += ' selected';
    }
    return (
      <div className={styles}>
        {`${this.props.text}€`}
      </div>
    );
  }
}

export default Marker;

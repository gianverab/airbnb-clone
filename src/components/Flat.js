import React, { Component } from 'react';
import './Flat.css';

class Flat extends Component {
  handleClick = () => {
    // Call the parent method selectFlat
    this.props.selectFlat(this.props.flat);
  }
  render() {
    const { flat } = this.props;
    const style = {
      backgroundImage: `url('${flat.imageUrl}')`,
    };
    return (
      <div className="flat" onClick={this.handleClick}>
        <div className="flat-picture" style={style} />
        <div className="flat-title">{`${flat.price}${flat.priceCurrency} - ${flat.name}`}</div>
      </div>
    );
  }
}
export default Flat;

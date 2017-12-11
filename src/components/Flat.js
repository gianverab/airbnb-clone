import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class Flat extends Component {
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
      <FlatWrapper onClick={this.handleClick}>
        <FlatPicture style={style} />
        <FlatTitle>{`${flat.price}${flat.priceCurrency} - ${flat.name}`}</FlatTitle>
      </FlatWrapper>
    );
  }
}

Flat.propTypes = {
  flat: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    priceCurrency: PropTypes.string.isRequired,
  }).isRequired,
};

const FlatWrapper = styled.div`
  flex-basis: calc(50% - 20px);
  margin: 10px;
  cursor: pointer;
  transition: all .5s ease-in-out;
  :hover {
    opacity: .8;
  }
`;
const FlatPicture = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
`;
const FlatTitle = styled.div`
  margin-top: 10px;
  font-weight: bold;
`;


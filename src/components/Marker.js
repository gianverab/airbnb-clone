import React from 'react';
import styled from 'styled-components';

const Marker = props => (
  <MarkerTip selected={props.selected}>
    {`${props.text}€`}
  </MarkerTip>
);

const MarkerTip = styled.div`
  background: ${props =>
    (props.selected ? 'yellow' : 'white')
};
  border-color: ${props =>
    (props.selected ? '#000' : '#999')
};
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  width: 60px;
  text-align: center;
  font-size: 16px;
  padding: 4px;
`;
export default Marker;

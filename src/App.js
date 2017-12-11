import React, { Component } from 'react';
import styled from 'styled-components';
import GoogleMap from 'google-map-react';
import Flat from './components/Flat';
import Marker from './components/Marker';

export default class App extends Component {
  state = {
    flats: [],
    allFlats: [],
    selectedFlat: null,
    search: '',
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json');
      const flats = await res.json();
      this.setState({
        flats,
        allFlats: flats,
      });
    } catch (error) {
      console.log(error);
    }
  }
  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      flats: this.state.allFlats.filter(flat => new RegExp(event.target.value, 'i').exec(flat.name)),
    });
  }
  selectFlat = (flat) => {
    console.log(flat);
    this.setState({
      selectedFlat: flat,
    });
  }
  render() {
    let center = {
      lat: 48.8566,
      lng: 2.3522,
    };
    if (this.state.selectedFlat) {
      center = {
        lat: this.state.selectedFlat.lat,
        lng: this.state.selectedFlat.lng,
      };
    }
    return (
      <AppWrapper>
        <Main>
          <SearchBox>
            <input
              type="text"
              placeholder="Search..."
              value={this.state.search}
              onChange={this.handleSearch}
            />
          </SearchBox>
          <Flats>
            {this.state.flats.map(flat =>
              (<Flat
                key={flat.name}
                flat={flat}
                selectFlat={this.selectFlat}
              />),
            )}
          </Flats>
        </Main>
        <MapContainer>
          <GoogleMap
            center={center}
            zoom={13}
          >
            {this.state.flats.map(flat =>
              (<Marker
                key={flat.name}
                lat={flat.lat}
                lng={flat.lng}
                text={flat.price}
                currency={flat.priceCurrency}
                selected={flat === this.state.selectedFlat}
              />),
            )}
          </GoogleMap>
        </MapContainer>
      </AppWrapper>
    );
  }
}

const AppWrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  display: flex;
`;

const Main = styled.div`
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
`;

const SearchBox = styled.div`
  padding: 10px;
  margin-right: 5px;
  input {
    width: 100%;
    height: 40px;
    font-size: 24px;
    color: #999;
    padding-left: 5px;
  }
`;

const MapContainer = styled.div`
  flex-grow: 1;
  height: 100vh;
  top: 0;
  position: sticky;
`;

const Flats = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;


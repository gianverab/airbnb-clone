import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import './App.css';
import Flat from './components/Flat';
import Marker from './components/Marker';

class App extends Component {
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
      <div className="app">
        <div className="main">
          <div className="search">
            <input
              type="text"
              placeholder="Search..."
              value={this.state.search}
              onChange={this.handleSearch}
            />
          </div>
          <div className="flats">
            {this.state.flats.map(flat =>
              (<Flat
                key={flat.name}
                flat={flat}
                selectFlat={this.selectFlat}
              />),
            )}
          </div>
        </div>
        <div className="map">
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
        </div>
      </div>
    );
  }
}

export default App;

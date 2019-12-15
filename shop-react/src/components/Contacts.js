import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class Contacts extends Component {

    render() {
        const mapStyles = {
            width: '100%',
            height: '100%',
          };

        return (
            <Map
            google={this.props.google}
            zoom={12}
            style={mapStyles}
            initialCenter={{ lat: 42.6787, lng: 23.3219}}
          >
               <Marker position={{ lat: 42.6877, lng: 23.3219}} />
               <Marker position={{ lat: 42.6687, lng: 23.3319}} />
               <Marker position={{ lat: 42.6797, lng: 23.3119}} />
          </Map>
        );
      }
    }
    
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCw1Cu5QmZqsFLWq-D7m12E3Qqjjj13xWY'
})(Contacts);

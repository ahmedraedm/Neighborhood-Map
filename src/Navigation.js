import React, { Component } from 'react';
import Map from './Map'


// import logo from './logo.svg';
import './App.css';
import './nav.css'

class Navigation extends Component {

    constructor() {
        super();
        this.hamburgerIcon = this.hamburgerIcon.bind(this);
    }

    state ={
        locations : [
          {title: 'Mortuary Temple of Hatshepsut', location: {lat: 25.7370083, lng: 32.6049106}},
          {title: 'Temple of Karnak', location: {lat: 25.7188346, lng: 32.6550816}},
          {title: 'Valley of Queens', location: {lat: 25.7285836, lng: 32.5907332}},
          {title: 'Medinet Habu', location: {lat: 25.7193131, lng: 32.5991514}},
          {title: 'Tombs of the Nobles', location: {lat: 25.7317558, lng: 32.6048123}}
        ]
      }

    hamburgerIcon() {
        // debugger
        var drawer = document.querySelector('#mySidenav');
        var map = document.querySelector('#map');
        map.classList.toggle('box80');

        drawer.classList.toggle('box20');
        map.classList.toggle('shrinkMap');

        drawer.classList.toggle('open');
    }

    render() {
        return (
            <div className="container">
                <div className="box" id="main">
                    <span id="icon" onClick={this.hamburgerIcon}>&#9776; </span>
                    {/* <span>Neighborhood App</span> */}
                </div>
                <nav id="mySidenav" className="sidenav box20">
                    <ul>
                        {this.state.locations.map((location)=>(
                        <li className="nav_item"><a href="#">{location.title}</a></li>
                        ))}
                    </ul>
                </nav>
                <div id="map" className="box80">
                   
                    <Map
                        id="myMap"
                        options={{
                        center: { lat: 41.0082, lng: 28.9784 },
                        zoom: 8
                        }}
                        
                        locations={this.state.locations}
                    />
                </div>
            </div >
        )
    }
}
export default Navigation

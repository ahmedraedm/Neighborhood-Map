import React, { Component } from 'react';
import Map from './Map'
import './App.css';
import './nav.css'

class Navigation extends Component {

    constructor() {
        super();
        this.hamburgerIcon = this.hamburgerIcon.bind(this);
        this.showClicked = this.showClicked.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        
    }

    state ={
        locations : [
          {title: 'Mortuary Temple of Hatshepsut', location: {lat: 25.7370083, lng: 32.6049106}, textToSearch:'Mortuary Temple of Hatshepsut'},
          {title: 'Temple of Karnak', location: {lat: 25.7188346, lng: 32.6550816}, textToSearch:'Karnak'},
          {title: 'Valley of the Queens', location: {lat: 25.7285836, lng: 32.5907332}, textToSearch:'Valley of the Queens'},
          {title: 'Medinet Habu', location: {lat: 25.7193131, lng: 32.5991514}, textToSearch:'Medinet Habu (temple)'},
          {title: 'Tombs of the Nobles', location: {lat: 25.7317558, lng: 32.6048123}, textToSearch:'List of Theban tombs'}
        ],
        filteredLocations : [
            {title: 'Mortuary Temple of Hatshepsut', location: {lat: 25.7370083, lng: 32.6049106}, textToSearch:'Mortuary Temple of Hatshepsut'},
            {title: 'Temple of Karnak', location: {lat: 25.7188346, lng: 32.6550816}, textToSearch:'Karnak'},
            {title: 'Valley of the Queens', location: {lat: 25.7285836, lng: 32.5907332}, textToSearch:'Valley of the Queens'},
            {title: 'Medinet Habu', location: {lat: 25.7193131, lng: 32.5991514}, textToSearch:'Medinet Habu (temple)'},
            {title: 'Tombs of the Nobles', location: {lat: 25.7317558, lng: 32.6048123}, textToSearch:'List of Theban tombs'}
        ],
        myMap:{},
        markers:[],
        query: ''

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

    showClicked(evt) {
        this.Map.showClicked(evt);
    }

    updateQuery(queryString){
        debugger
        this.state.filteredLocations = []
        let query = queryString.trim()
        this.setState({query: query});
        this.state.locations.map(function (location) {
            debugger
            if (location.title.toLowerCase().includes(query.toLowerCase())) { // Neglect case sensitive
                this.state.filteredLocations.push(location)
            }
        }.bind(this))
        this.Map.filterMarkers(query);
    }

    render() {
        return (
            <div className="container">
                <div className="box" id="main">
                    <span id="icon" onClick={this.hamburgerIcon}>&#9776; </span>
                </div>
                <nav id="mySidenav" className="sidenav box20">

                    <ul>
                    <input
                                id='filter'
                                type="text"
                                placeholder="Filter by location title"
                                value={this.state.query}
                                onChange={(event) => this.updateQuery(event.target.value)}
                            />
                        {this.state.filteredLocations.map((location)=>(
                        <li className="nav_item">
                        <a href="#" onClick={this.showClicked}>{location.title} </a></li>
                        ))}
                    </ul>
                </nav>
                <div id="map" className="box80">
                   
                    <Map
                        id="myMap"
                        options={{
                        center: { lat: 41.0082, lng: 28.9784 },
                        zoom: 13
                        }}
                        
                        locations={this.state.filteredLocations}
                        onRef={ref => (this.Map = ref)}
                    />
                </div>
            </div >
        )
    }
}
export default Navigation

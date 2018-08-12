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

    state = {
        locations: [
            { title: 'Mortuary Temple of Hatshepsut', location: { lat: 25.7370083, lng: 32.6049106 }, textToSearch: 'Mortuary Temple of Hatshepsut', keywordIndex: '0', photoIndex:['0','1','2'] },
            { title: 'Temple of Karnak', location: { lat: 25.7188346, lng: 32.6550816 }, textToSearch: 'Karnak', keywordIndex: '2', photoIndex:['0','4','2'] },
            { title: 'Valley of the Queens', location: { lat: 25.7285836, lng: 32.5907332 }, textToSearch: 'Valley of the Queens', keywordIndex: '0', photoIndex:['0','1','2'] },
            { title: 'Medinet Habu', location: { lat: 25.7193131, lng: 32.5991514 }, textToSearch: 'Medinet Habu (temple)', keywordIndex: '0', photoIndex:['0','1','2'] },
            { title: 'The Great Pyramid of Giza', location: { lat: 29.9792345, lng: 31.1320132 }, textToSearch: 'Great Pyramid of Giza', keywordIndex: '0', photoIndex:['0','6','8'] },
            { title: 'The Great Sphinx of Giza', location: { lat: 29.975589, lng: 31.1326886 }, textToSearch: 'Great Sphinx of Giza', keywordIndex: '0', photoIndex:['0','1','2'] },
            { title: 'Cairo Tower', location: { lat: 30.0487422, lng: 31.2214643 }, textToSearch: 'Cairo Tower', keywordIndex: '0', photoIndex:['0','6','3'] },
            { title: 'Mosque of Sultan Hassan', location: { lat: 30.04642, lng: 31.2335173 }, textToSearch: 'Mosque-Madrassa of Sultan Hassan', keywordIndex: '0', photoIndex:['0','1','2'] },
            { title: 'Museum of Islamic Art Cairo', location: { lat: 30.0574029, lng: 31.2363723 }, textToSearch: 'Museum of Islamic Art Cairo', keywordIndex: '0', photoIndex:['0','1','2'] },

        ],
        filteredLocations: [
            { title: 'Mortuary Temple of Hatshepsut', location: { lat: 25.7370083, lng: 32.6049106 }, textToSearch: 'Mortuary Temple of Hatshepsut', keywordIndex: '0', photoIndex:['0','1','2'] },
            { title: 'Temple of Karnak', location: { lat: 25.7188346, lng: 32.6550816 }, textToSearch: 'Karnak', keywordIndex: '2', photoIndex:['0','4','2'] },
            { title: 'Valley of the Queens', location: { lat: 25.7285836, lng: 32.5907332 }, textToSearch: 'Valley of the Queens', keywordIndex: '0', photoIndex:['0','1','2'] },
            { title: 'Medinet Habu', location: { lat: 25.7193131, lng: 32.5991514 }, textToSearch: 'Medinet Habu (temple)', keywordIndex: '0', photoIndex:['0','1','2'] },
            { title: 'The Great Pyramid of Giza', location: { lat: 29.9792345, lng: 31.1320132 }, textToSearch: 'Great Pyramid of Giza', keywordIndex: '0', photoIndex:['0','6','8'] },
            { title: 'The Great Sphinx of Giza', location: { lat: 29.975589, lng: 31.1326886 }, textToSearch: 'Great Sphinx of Giza', keywordIndex: '0', photoIndex:['0','1','2'] },
            { title: 'Cairo Tower', location: { lat: 30.0487422, lng: 31.2214643 }, textToSearch: 'Cairo Tower', keywordIndex: '0', photoIndex:['0','6','3'] },
            { title: 'Mosque of Sultan Hassan', location: { lat: 30.04642, lng: 31.2335173 }, textToSearch: 'Mosque-Madrassa of Sultan Hassan', keywordIndex: '0', photoIndex:['0','1','2'] },
            { title: 'Museum of Islamic Art Cairo', location: { lat: 30.0574029, lng: 31.2363723 }, textToSearch: 'Museum of Islamic Art Cairo', keywordIndex: '0', photoIndex:['1','2','3'] },
        ],
        myMap: {},
        markers: [],
        query: ''
    }

    hamburgerIcon() {
        // debugger
        var drawer = document.querySelector('#mySidenav');
        drawer.classList.toggle('open');
    }

    showClicked(evt) {
        this.Map.showClicked(evt);
    }

    updateQuery(queryString) {
        // debugger
        this.state.filteredLocations = []
        let query = queryString.trim()
        this.setState({ query: query });
        this.state.locations.map(function (location) {
            // debugger
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
                <div className="container">
                    <span id="icon" onClick={this.hamburgerIcon} title="Hamburger menu Icon" aria-label="Hamburger menu Icon">&#9776;</span>
                    <span id="title" title="Application title" aria-label="Application title">Welcome To EGYPT</span>
                    </div>
                </div>
                <nav id="mySidenav" className="sidenav nav">
                    <ul role="navigation" aria-label="Locations navigation">
                        <input role="textbox" aria-label="Filter places"
                            id='filter'
                            type="text"
                            placeholder="Filter by place name"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                        {this.state.filteredLocations.map((location) => (
                            <li className="nav_item">
                                <a href="#" onClick={this.showClicked}>{location.title} </a></li>
                        ))}
                    </ul>
                </nav>
                <div id="map" role="application" aria-label="locations in map">
                    <Map
                        id="myMap"
                        options={{
                            center: { lat: 41.0082, lng: 28.9784 },
                            zoom: 13
                        }}
                        locations={this.state.filteredLocations}
                        onRef={ref => (this.Map = ref)}
                    // setLocationId = {this.state.setLocationId}
                    />
                </div>
            </div >
        )
    }
}
export default Navigation

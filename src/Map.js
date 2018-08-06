import React, { Component } from 'react';
import { render } from 'react-dom';

class Map extends Component {
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this);
        this.showListings = this.showListings.bind(this);
        this.makeMarkerIcon = this.makeMarkerIcon.bind(this);
    }

    state = {
        markers: []
    }

    onScriptLoad() {
        debugger
        var defaultIcon = this.makeMarkerIcon('0091ff');
        var highlightedIcon = this.makeMarkerIcon('FFFF24');
        var largeInfowindow = new window.google.maps.InfoWindow();
        const map = new window.google.maps.Map(
            document.getElementById(this.props.id),
            this.props.options);
        let markers = []
        let marker;
        this.props.locations.map(function (x) {
            marker = new window.google.maps.Marker({
                position: x.location,
                title: x.title,
                animation: window.google.maps.Animation.DROP,
                icon: defaultIcon
                //   id: i
            })
            marker.addListener('click', function () {
                // this.populateInfoWindow(this, largeInfowindow, map);
                if (largeInfowindow.this != this) {
                    largeInfowindow.this = this;
                    largeInfowindow.setContent('<div>' + this.title + '</div>');
                    largeInfowindow.open(map, this);
                    // Make sure the marker property is cleared if the infowindow is closed.
                    largeInfowindow.addListener('closeclick', function () {
                        largeInfowindow.this = null;
                    });
                }
            });
            marker.addListener('mouseover', function () {
                this.setIcon(highlightedIcon);
            });
            marker.addListener('mouseout', function () {
                this.setIcon(defaultIcon);
            });
            markers.push(marker)
        }.bind(this))
        this.setState({ markers: markers })
        this.showListings(map)
    }

    makeMarkerIcon(markerColor) {
        var markerImage = new window.google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
            '|40|_|%E2%80%A2',
            new window.google.maps.Size(21, 34),
            new window.google.maps.Point(0, 0),
            new window.google.maps.Point(10, 34),
            new window.google.maps.Size(21, 34));
        return markerImage;
    }

    showListings(map) {
        const bounds = new window.google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        this.state.markers.map((marker) => (
            marker.setMap(map),
            bounds.extend(marker.position)
        ))
        map.fitBounds(bounds);
    }

    highlight() {

    }

    componentDidMount() {
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://maps.google.com/maps/api/js?key=AIzaSyAgu2EhLwLKc3A2uqkqaV0uNFZ-j6ryk1Q`;
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                this.onScriptLoad()
            })
        } else {
            this.onScriptLoad()
        }
    }

    render() {
        return (
            <div id={this.props.id} />
        );
    }
}

export default Map
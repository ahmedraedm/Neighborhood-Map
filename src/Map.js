import React, { Component } from 'react';
import { render } from 'react-dom';

class Map extends Component {

    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this);
        this.showMarkers = this.showMarkers.bind(this);
        this.makeMarkerIcon = this.makeMarkerIcon.bind(this);
        // this.hideMarkers = this.hideMarkers.bind(this);
        this.showClicked = this.showClicked.bind(this);
        // this.showSingleMarker = this.showSingleMarker.bind(this);
        this.clearHighlight = this.clearHighlight.bind(this);
        // this.updateQuery = this.updateQuery.bind(this);
        

    }

    state = {
        markers: [],
        myMap: {},
        largeInfowindow: {}
    }

    onScriptLoad() {
        debugger
        this.props.onRef(this)
        var defaultIcon = this.makeMarkerIcon('0091ff');
        var highlightedIcon = this.makeMarkerIcon('FFFF24');
        var largeInfowindow = new window.google.maps.InfoWindow();
        this.state.largeInfowindow = largeInfowindow
        const map = new window.google.maps.Map(
            document.getElementById(this.props.id),
            this.props.options);
        // let markers = []
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
                debugger

                if (largeInfowindow.this != this) {
                    largeInfowindow.this = this;
                    largeInfowindow.setContent('<div>' + this.title + '</div>');
                    largeInfowindow.open(map, this);
                    this.setIcon(highlightedIcon);
                    largeInfowindow.addListener('closeclick', function () {
                        largeInfowindow.this = null;

                    });
                } else {
                    this.setIcon(highlightedIcon);
                }
            }
            );
            marker.addListener('mouseover', function () {
                this.setIcon(highlightedIcon);
            });
            marker.addListener('mouseup', function () {
                debugger
                this.clearHighlight();
            }.bind(this));
            marker.addListener('mouseout', function () {
                this.setIcon(defaultIcon);
            });
            debugger
            this.state.markers.push(marker)
        }.bind(this))
        debugger
        this.setState({
            myMap: map
        })
        this.showMarkers(map)
    }

    clearHighlight() {
        debugger
        var defaultIcon = this.makeMarkerIcon('0091ff');
        for (let i = 0; i < this.state.markers.length; i++) {
            this.state.markers[i].setIcon(defaultIcon)
        }
    }

    // updateQuery(query){
    //     this.props.locations.map(function (location) {
            
    //     })
    // }

    showClicked(selected) {
        debugger
        var defaultIcon = this.makeMarkerIcon('0091ff');
        var highlightedIcon = this.makeMarkerIcon('FFFF24');
        let text = selected.target.text.trim()
        for (let i = 0; i < this.state.markers.length; i++) {
            if (this.state.markers[i].title === text) {
                this.state.markers[i].setIcon(highlightedIcon)
                if (this.state.largeInfowindow.this != this.state.markers[i]) {
                    this.state.largeInfowindow.this = this.state.markers[i];
                    this.state.largeInfowindow.setContent('<div>' + this.state.markers[i].title + '</div>');
                    this.state.largeInfowindow.open(this.state.myMap, this.state.markers[i]);
                    this.state.largeInfowindow.addListener('closeclick', function () {
                        this.state.largeInfowindow.this = null;
                    });
                }
            } else {
                this.state.markers[i].setIcon(defaultIcon)
            }
        }
    }

    // hideMarkers() {
    //     this.state.markers.map(function (marker) {
    //         marker.setMap(null);
    //     })
    // }


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

    showMarkers(map) {
        const bounds = new window.google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        this.state.markers.map((marker) => (
            marker.setMap(map),
            bounds.extend(marker.position)
        ))
        map.fitBounds(bounds);
    }

    // showSingleMarker(map, selected) {
    //     debugger
    //     const bounds = new window.google.maps.LatLngBounds();
    //     this.state.markers.filter(marker => marker.title === selected[0].title).map(function (marker) {
    //         marker.setMap(map),
    //             bounds.extend(marker.position)
    //         map.fitBounds(bounds);
    //     })

    // }

    componentWillUnmount() {
        this.props.onRef(undefined)
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
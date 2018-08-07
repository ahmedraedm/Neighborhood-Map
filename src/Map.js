import React, { Component } from 'react';
import { render } from 'react-dom';

class Map extends Component {

    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this);
        this.showMarkers = this.showMarkers.bind(this);
        this.makeMarkerIcon = this.makeMarkerIcon.bind(this);
        this.filterMarkers = this.filterMarkers.bind(this);
        this.showClicked = this.showClicked.bind(this);
        this.clearHighlight = this.clearHighlight.bind(this);
        this.getMarker = this.getMarker.bind(this);
        this.clearMarkers = this.clearMarkers.bind(this);
    }

    state = {
        markers: [],
        myMap: {},
        largeInfowindow: {},
        bounds:{}
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
        let marker;
        this.props.locations.map(function (x) {
            marker = new window.google.maps.Marker({
                position: x.location,
                title: x.title,
                animation: window.google.maps.Animation.DROP,
                icon: defaultIcon
                //   id: i
            })
            marker.addListener('click', function (e) {
                debugger
                let selMarker = this.getMarker(e);
                if (this.state.largeInfowindow.this != selMarker) {
                    this.state.largeInfowindow.this = selMarker;
                    this.state.largeInfowindow.setContent('<div>' + selMarker.title + '</div>');
                    this.state.largeInfowindow.open(map, selMarker);
                    selMarker.setIcon(highlightedIcon);
                    this.state.largeInfowindow.addListener('closeclick', function () {
                        debugger
                        this.state.largeInfowindow.selMarker = null;
                        this.clearHighlight();
                    }.bind(this));
                }else {
                    selMarker.setIcon(highlightedIcon);
                }
            }.bind(this)
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

    getMarker(e){
        debugger
        let selMarker;
        this.state.markers.map(function(x) {
            if(x.title===e.va.currentTarget.title){selMarker= x}
       })
       return selMarker
    }

    clearHighlight() {
        debugger
        var defaultIcon = this.makeMarkerIcon('0091ff');
        for (let i = 0; i < this.state.markers.length; i++) {
            this.state.markers[i].setIcon(defaultIcon)
        }
    }

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
                }
            } else {
                this.state.markers[i].setIcon(defaultIcon)
            }
        }
    }

    clearMarkers(){
        debugger
        this.state.largeInfowindow.close()
    }

    filterMarkers(query) {
        this.clearHighlight()
        this.clearMarkers()
        let map = this.state.myMap;
        this.state.markers.map(function (marker) {
            debugger
            if(!marker.title.toLowerCase().includes(query.toLowerCase())){
              marker.setMap(null);
            }else{
                marker.setMap(map),
                this.state.bounds.extend(marker.position)
                map.fitBounds(this.state.bounds);
                
            }
        }.bind(this))
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

    showMarkers(map) {
        this.state.bounds = new window.google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        this.state.markers.map((marker) => (
            marker.setMap(map),
            this.state.bounds.extend(marker.position)
        ))
        map.fitBounds(this.state.bounds);
    }

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
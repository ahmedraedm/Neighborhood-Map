import React, { Component } from 'react';
import { render } from 'react-dom';
import './nav.css'

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
        this.fetch = this.fetch.bind(this);
    }

    state = {
        markers: [],
        myMap: {},
        largeInfowindow: {},
        bounds: {}
    }

    onScriptLoad() {
        // debugger
        let infoWindowContent = '<div id="infoWindow"></div>'
        this.props.onRef(this)
        var defaultIcon = this.makeMarkerIcon('0091ff');
        var highlightedIcon = this.makeMarkerIcon('FFFF24');
        // debugger
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
                textToSearch: x.textToSearch,
                animation: window.google.maps.Animation.DROP,
                icon: defaultIcon,
                keywordIndex: x.keywordIndex,
                photoIndex: x.photoIndex
                // id: placeId
            })
            marker.addListener('click', function (e) {
                // debugger
                let selMarker = this.getMarker(e);
                // debugger
                if (this.state.largeInfowindow.this != selMarker) {
                    this.state.largeInfowindow.this = selMarker;
                    this.state.largeInfowindow.open(map, selMarker);
                    selMarker.setIcon(highlightedIcon);
                    this.state.largeInfowindow.addListener('closeclick', function () {
                        // debugger
                        console.log(selMarker)
                        this.state.largeInfowindow.this = null;
                        this.clearHighlight();
                    }.bind(this));
                } else {
                    selMarker.setIcon(highlightedIcon);
                }
                this.fetch(selMarker)
            }.bind(this)
            );
            marker.addListener('mouseover', function () {
                this.setIcon(highlightedIcon);
            });
            marker.addListener('mouseup', function () {
                // debugger
                this.clearHighlight();
            }.bind(this));
            marker.addListener('mouseout', function () {
                this.setIcon(defaultIcon);
            });
            // debugger
            this.state.markers.push(marker)
        }.bind(this))

        // debugger
        this.setState({
            myMap: map
        })
        this.showMarkers(map)
    }

    fetch(selMarker) {
        // debugger
        let placeId,content,keywordIndex,firstPhoto = ''
        let photoIndex = []
        var request = {
            location: this.state.myMap.getCenter(),
            radius: '500',
            query: selMarker.textToSearch
        };
        var service = new window.google.maps.places.PlacesService(this.state.myMap);
        // debugger
        service.textSearch(request, function (results, status) {
            // debugger
            let placeIdText = 'place_id'
            // debugger
            //Error Handling
            if (placeIdText in results[0]) {
                placeId = results[0].place_id
                var request = {
                    placeId: placeId
                }
                service.getDetails(request, function (place, status) {
                    if (status === 'OK') {
                        // debugger
                        if('photos' in place){
                            if ('8' in place.photos) {
                                debugger
                                photoIndex = selMarker.photoIndex
                                // firstPhoto = photoIndex[0];
                                content = '<img src=' + place.photos[photoIndex[0]].getUrl({ 'maxWidth': 200, 'maxHeight': 220 }) + ' ' + 'alt=' + selMarker.title + '>'
                            + '<img src=' + place.photos[photoIndex[1]].getUrl({ 'maxWidth': 200, 'maxHeight': 220 }) + ' ' + 'alt=' + selMarker.title + '>'
                            + '<img src=' + place.photos[photoIndex[2]].getUrl({ 'maxWidth': 200, 'maxHeight': 220 }) + ' ' + 'alt=' + selMarker.title + '>'
                            }
                        }else{
                            alert('Cannot retreive images for the location: '+ selMarker.title)
                            content=''
                        }
                        fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search='${selMarker.textToSearch}'&limit=5`)
                            .then(function (resp) {
                                return resp.json()
                            }.bind(this)).then(function (data) {
                                if (data) {
                                    // debugger
                                    keywordIndex = selMarker.keywordIndex
                                    this.state.largeInfowindow.setContent(
                                      '<div id="infoWindow">'
                                    + '<div class="title">' + '<h2>' + selMarker.title + '</h2>'+'</div>' 
                                    + '<div>' + '<span>' + data[2][keywordIndex] + '</span>' + '</div>' 
                                    + '<div class="link">'+ '<a href=' + data[3][keywordIndex] + '>' + data[3][keywordIndex] + '</a>' + '</div>' 
                                    + '<div>' + content + '</div>'
                                    + '<div><span id="source">' + 'Source: ' + '<a href=https://en.wikipedia.org/wiki/Main_Page>Wikipedia</a>' + '</span></div>'
                                    + '</div>');
                                } else {
                                    alert('Cannot load article data for this location: ' + selMarker.title)  // Couldn't retreive location article
                                }
                            }.bind(this))
                            .catch(function (e) {
                                // debugger
                                alert('Cannot load Infowindow data due to the following error: \n' + '"' + e.message + '"')
                            })
                    } else {
                        alert('Images requested for location: ' + selMarker.title + ' cannot be retreived')  // Couldn't retreive location images
                    }
                }.bind(this));
            } else {                  // Couldn't retreive location ID
                alert('Location ID of: ' + selMarker.title + ' cannot be retreived')
            }
        }.bind(this));
    }

    getMarker(e) {
        // debugger
        let selMarker;
        this.state.markers.map(function (x) {
            if (x.title === e.va.currentTarget.title) { selMarker = x }
        })
        return selMarker
    }

    clearHighlight() {
        // debugger
        var defaultIcon = this.makeMarkerIcon('0091ff');
        for (let i = 0; i < this.state.markers.length; i++) {
            this.state.markers[i].setIcon(defaultIcon)
        }
    }

    showClicked(selected) {
        // debugger
        let selMarker;
        var defaultIcon = this.makeMarkerIcon('0091ff');
        var highlightedIcon = this.makeMarkerIcon('FFFF24');
        let text = selected.target.text.trim()
        for (let i = 0; i < this.state.markers.length; i++) {
            if (this.state.markers[i].title === text) {
                this.state.markers[i].setIcon(highlightedIcon)
                selMarker = this.state.markers[i]
                if (this.state.largeInfowindow.this != this.state.markers[i]) {
                    this.state.largeInfowindow.this = this.state.markers[i];
                    this.state.largeInfowindow.open(this.state.myMap, this.state.markers[i]);
                    this.fetch(selMarker)
                }
            } else {
                this.state.markers[i].setIcon(defaultIcon)
            }
        }
        // debugger
        let selectedLocation = this.props.locations.filter(loc=>loc.title===text)
        var center = new window.google.maps.LatLng(selectedLocation[0].location.lat,selectedLocation[0].location.lng);
        this.state.myMap.panTo(center);
        this.state.myMap.setZoom(15)
    }

    clearMarkers() {
        // debugger
        this.state.largeInfowindow.close()
    }

    filterMarkers(query) {
        // debugger
        this.clearHighlight()
        this.clearMarkers()
        let map = this.state.myMap;
        this.state.markers.map(function (marker) {
            // debugger
            if (!marker.title.toLowerCase().includes(query.toLowerCase())) {
                marker.setMap(null);
            } else {
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
            s.src = `https://maps.google.com/maps/api/js?libraries=places&key=AIzaSyAgu2EhLwLKc3A2uqkqaV0uNFZ-j6ryk1Q`;
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
            <div id={this.props.id}  className="map" role="application" aria-label="locations in map" />
        );
    }
}



export default Map
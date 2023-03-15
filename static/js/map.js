let current_location_coordinates;
let map;
let olview;
let source_location;
let destination_location;
let source_location_marker;
let destination_location_marker;
let msg_el = $("#error_message");


function getLocation() {
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    current_location_coordinates = [lon, lat];
    create_map(utils.to3857([lon, lat]));
    utils.create_current_location_marker([lon, lat]);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            break;
        case error.POSITION_UNAVAILABLE:
            break;
        case error.TIMEOUT:
            break;
        case error.UNKNOWN_ERROR:
            break;
    }
    create_map(-100.00641136532026, 36.795101535982695);
}

let vectorSource = new ol.source.Vector(),
    vectorLayer = new ol.layer.Vector({
        source: vectorSource
    }),
    styles = {
        route: new ol.style.Style({
            stroke: new ol.style.Stroke({
                width: 6, color: [60, 223, 225, 1]
            })
        }),
        traffic_route: new ol.style.Style({
            stroke: new ol.style.Stroke({
                width: 6, color: [255, 0, 0, 0.8]
            })
        }),
        icon: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: icon_url
            })
        }),
        checkpoint_icon: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: checkpoint_url
            })
        }),
        source_icon: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: source_icon_url
            })
        }),
        my_current_location_icon: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: current_location_icon
            })
        }),
        geoMarker: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: current_location_icon
            })
        }),

        sun: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: sun
            })
        }),
        cloudy: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: cloudy
            })
        }),
        fog: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: fog
            })
        }),
        wind: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: wind
            })
        }),
        rain: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: rain
            })
        }),
        snow: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: snow
            })
        }),
        storm: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: storm
            })
        }),
    };

function createWeatherMarker(src) {
    return new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: src
        })
    });
}

function createStyle({textAlign, justify, route_length, route_time}) {
    return new ol.style.Style({
        text: new ol.style.Text({
            font: '16px sans-serif',
            textAlign,
            justify,
            text:
                `Distance: ${route_length}\nTime: ${route_time}`,
            fill: new ol.style.Fill({
                color: [255, 255, 255, 1],
            }),
            backgroundFill: new ol.style.Fill({
                color: [168, 50, 153, 0.6],
            }),
            padding: [2, 2, 2, 2],
        }),
    });
}

function create_map(map_center) {
    olview = new ol.View({
        center: map_center,
        zoom: 6
    });

    map = new ol.Map({
        target: 'map',
        view: olview,
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            vectorLayer
        ],
    });

    map.on('click', function (evt) {
        let coord4326 = utils.to4326(evt.coordinate);
        // utils.createFeature(coord4326);
        console.log(coord4326)
    });
}

let utils = {
    createFeature: function (coord) {
        let feature = new ol.Feature({
            type: 'place',
            geometry: new ol.geom.Point(ol.proj.fromLonLat(coord))
        });
        feature.setStyle(styles.icon);
        vectorSource.clear();
        vectorSource.addFeature(feature);
        // utils.create_current_location_marker(current_location_coordinates);
    },
    createRoute: function () {
        //get the route
        var source = `${source_location[1]},${source_location[0]}`;
        var destination = `${destination_location[1]},${destination_location[0]}`;
        features = []
        const api_url = "/map/" + source + "/" + destination + "/"
        fetch(api_url).then(function (r) {
            return r.json();
        }).then(function (json) {
            create_route(json.points, json.sections, json['details'])
        })
    },
    create_current_location_marker: function (coord) {
        let feature = new ol.Feature({
            type: 'place',
            geometry: new ol.geom.Point(ol.proj.fromLonLat(coord))
        });
        feature.setStyle(styles.my_current_location_icon);
        vectorSource.addFeature(feature);
    }

    ,
    to4326: function (coord) {
        return ol.proj.transform([
            parseFloat(coord[0]), parseFloat(coord[1])
        ], 'EPSG:3857', 'EPSG:4326');
    },
    to3857: function (coord) {
        return ol.proj.transform([
            parseFloat(coord[0]), parseFloat(coord[1])
        ], 'EPSG:4326', 'EPSG:3857');
    },

    createSourceFeature: function (coord) {
        let feature = new ol.Feature({
            type: 'place',
            geometry: new ol.geom.Point(ol.proj.fromLonLat(coord))
        });
        feature.setStyle(styles.source_icon);
        vectorSource.clear();
        source_location_marker = feature;
        vectorSource.addFeature(feature);
        if (destination_location !== undefined) {
            utils.createOnlyDestinationFeature(destination_location);
            utils.createRoute();
        }
        map.getView().fit(vectorLayer.getSource().getExtent(), {
            size: map.getSize(),
            maxZoom: 16,
            padding: [60, 60, 60, 60],
            constrainResolution: false
        });
        // utils.create_current_location_marker(current_location_coordinates);
    },
    createDestinationFeature: function (coord) {
        let feature = new ol.Feature({
            type: 'place',
            geometry: new ol.geom.Point(ol.proj.fromLonLat(coord))
        });
        feature.setStyle(styles.icon);
        vectorSource.clear();
        destination_location_marker = feature;
        vectorSource.addFeature(feature);
        if (source_location !== undefined) {
            utils.createOnlySourceFeature(source_location);
            utils.createRoute();
        }
        map.getView().fit(vectorLayer.getSource().getExtent(), {
            size: map.getSize(),
            maxZoom: 16,
            padding: [60, 60, 60, 60],
            constrainResolution: false
        });
        // utils.create_current_location_marker(current_location_coordinates);
    },
    createOnlySourceFeature: function (coord) {
        let feature = new ol.Feature({
            type: 'place',
            geometry: new ol.geom.Point(ol.proj.fromLonLat(coord))
        });
        feature.setStyle(styles.source_icon);
        source_location_marker = feature;
        vectorSource.addFeature(feature);
    },
    createOnlyDestinationFeature: function (coord) {
        let feature = new ol.Feature({
            type: 'place',
            geometry: new ol.geom.Point(ol.proj.fromLonLat(coord))
        });
        feature.setStyle(styles.icon);
        destination_location_marker = feature;
        vectorSource.addFeature(feature);
    },
};

// geolLocation function requires location permission
// getLocation()

create_map(utils.to3857([-100.00641136532026, 36.795101535982695]));


var intervalId = window.setInterval(function(){
    if (destination_location !== undefined && source_location !== undefined)
        utils.createRoute()
}, 50000);

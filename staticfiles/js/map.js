let current_location_coordinates;

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
    create_map([8078795.833261827, 2632691.5825704993]);
}

let vectorSource = new ol.source.Vector(),
    vectorLayer = new ol.layer.Vector({
        source: vectorSource
    }),
    styles = {
        route: new ol.style.Style({
            stroke: new ol.style.Stroke({
                width: 6, color: [40, 40, 40, 0.8]
            })
        }),
        icon: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: icon_url
            })
        }),
        my_current_location_icon: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: current_location_icon
            })
        }),
    };

let map;

function create_map(map_center) {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            vectorLayer
        ],
        view: new ol.View({
            center: map_center,
            zoom: 15
        })
    });

    map.on('click', function (evt) {
        let coord4326 = utils.to4326(evt.coordinate);
        utils.createFeature(coord4326);
        $("#id_long").val(coord4326[0].toString().slice(0, 9));
        $("#id_lat").val(coord4326[1].toString().slice(0, 9));
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
        utils.create_current_location_marker(current_location_coordinates);
    },
    create_current_location_marker: function (coord) {
        let feature = new ol.Feature({
            type: 'place',
            geometry: new ol.geom.Point(ol.proj.fromLonLat(coord))
        });
        feature.setStyle(styles.my_current_location_icon);
        vectorSource.addFeature(feature);
    },
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
};

getLocation()


$("#my-button").click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    $.ajax({
        url: "https://photon.komoot.io/api/?q=india&limit=10&lang=en", success: function (result) {
            console.log(result);
        }
    });
})
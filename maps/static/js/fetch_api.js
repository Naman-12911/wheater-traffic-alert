let weather_icon_count = 0;
let weather_flag = true;

function fetch_traffic_speed(lat, long, distance) {
    const api_url = "/map/" + lat + "/" + long + "/"
    $.ajax({
        url: api_url, success: function (response) {
            weather_icon_count = weather_icon_count + 1
            let current_speed = response.speed;
            if (current_speed < flow_speed_boundary) {
                create_traffic_route(distance);
                $('#alert_log').prepend(
                    `
                    <div class="alert alert-danger" role="alert">
                        Traffic in the route
                    </div>
                    `
                )
            }
            if (weather_icon_count > 2 || weather_flag) {
                weather_mark(distance, response.weather_code);
                weather_icon_count = 0;
                weather_flag = false;
            }
        }
    });
}

function create_traffic_route(distance_in_map) {
    var traffic_coordinates = []

    for (let i = 2; i > 0; i--) {
        let line_distance = distance_in_map - (0.001 * i);
        if (line_distance > 0)
            traffic_coordinates.push(map_route.getCoordinateAt(line_distance))
    }
    for (let i = 0; i < 2; i++) {
        let line_distance = distance_in_map + (0.001 * i);
        if (line_distance < 1)
            traffic_coordinates.push(map_route.getCoordinateAt(line_distance))
    }

    fetch(url_osrm_route + utils.to4326(traffic_coordinates[0]) + ';' + utils.to4326(traffic_coordinates[traffic_coordinates.length - 1])).then(function (r) {
        return r.json();
    }).then(function (json) {
        if (json.code !== 'Ok') {
            msg_el.innerHTML = 'No route found.';
            return;
        }
        msg_el.innerHTML = 'Route added';
        //points.length = 0;

        let polyline = json.routes[0].geometry;
        // route is ol.geom.LineString
        var route = new ol.format.Polyline({
            factor: 1e5
        }).readGeometry(polyline, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        });
        var feature = new ol.Feature({
            type: 'route',
            geometry: route
        });
        feature.setStyle(styles.traffic_route);
        vectorSource.addFeature(feature);
    });
}


function weather_mark(map_distance, weather_code) {
    let lat_long = utils.to4326(map_route.getCoordinateAt(map_distance))
    let feature = new ol.Feature({
        type: 'place',
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lat_long[0] + 0.0009, lat_long[1] + 0.0009]))
    });
    if (weather_code >= 0 && weather_code <= 19) {
        feature.setStyle(styles.sun);
        $('#alert_log').prepend(
            `
            <div class="alert alert-warning" role="alert">
                Weather is good.
            </div>
            `
        )
    } else if (weather_code > 19 && weather_code <= 29) {
        feature.setStyle(styles.cloudy);
        $('#alert_log').prepend(
            `
            <div class="alert alert-success" role="alert">
                Weather is cloudy.
            </div>
            `
        )
    } else if (weather_code > 29 && weather_code <= 39) {
        feature.setStyle(styles.fog);
        $('#alert_log').prepend(
            `
            <div class="alert alert-warning" role="alert">
                Weather is foggy!
            </div>
            `
        )
    } else if (weather_code > 39 && weather_code <= 49) {
        feature.setStyle(styles.wind);
        $('#alert_log').prepend(
            `
            <div class="alert alert-danger" role="alert">
                Weather is windy
            </div>
            `
        )
    } else if (weather_code > 49 && weather_code <= 59) {
        feature.setStyle(styles.snow);
        $('#alert_log').prepend(
            `
            <div class="alert alert-danger" role="alert">
                Weather is snowy.
            </div>
            `
        )
    } else if (weather_code > 59 && weather_code <= 69) {
        feature.setStyle(styles.rain);
        $('#alert_log').prepend(
            `
            <div class="alert alert-danger" role="alert">
                Weather is rainy.
            </div>
            `
        )
    } else {
        feature.setStyle(styles.storm);
        $('#alert_log').prepend(
            `
            <div class="alert alert-dark" role="alert">
                storm alert!
            </div>
            `
        )
    }
    vectorSource.addFeature(feature);
}
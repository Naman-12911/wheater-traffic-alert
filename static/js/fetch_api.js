function fetch_weather(lat, long, start_end_flag) {
    const api_url = "/map/weather/" + lat + "/" + long + "/"
    $.ajax({
        url: api_url, success: function (response) {
            const city = response.location_details.address['city'];
            const place_name = response.location_details['name']
            const location_address = response.location_details['display_name']
            const temperature = response.temperature;
            const traffic = getTrafficLevel(response.traffic_speed);
            const weather_details = get_weather_mark(response.weather_code);
            const weather_marker = weather_details['marker'];
            const weather_info = weather_details['message'];
            const detail_card = create_alert_card(city, place_name, temperature, location_address, traffic, weather_marker, weather_info);
            $('#alert_log').prepend(detail_card);

            set_weather_mark_with_checkpoint(lat, long, weather_marker, start_end_flag);
        }
    });
}


function set_weather_mark_with_checkpoint(lat, long, weather_marker_src, start_end_flag) {
    let feature = new ol.Feature({
        type: 'place',
        geometry: new ol.geom.Point(ol.proj.fromLonLat([long + 0.0009, lat + 0.0009]))
    });
    feature.setStyle(createWeatherMarker(weather_marker_src));
    vectorSource.addFeature(feature);
    if (!start_end_flag) {
        let checkpoint_feature = new ol.Feature({
            type: 'place',
            geometry: new ol.geom.Point(ol.proj.fromLonLat([long, lat]))
        });
        checkpoint_feature.setStyle(styles.checkpoint_icon);
        vectorSource.addFeature(checkpoint_feature);
    }
}

function get_weather_mark(weather_code) {
    const weather_condtion = get_weather_code[weather_code];
    return {'marker': weather_condtion['src'], "message": weather_condtion['description']}
}

function getTrafficLevel(number) {
    console.log(number)
    if (number >= 30) {
        return "Low traffic";
    } else if (number <= 29 && number >= 20) {
        return "Medium traffic";
    } else {
        return "High traffic";
    }
}

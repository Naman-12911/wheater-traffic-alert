function divideRange(n) {
    const step = 1 / (n - 1);
    const result = [];

    for (let i = 0; i < n; i++) {
        result.push(i * step);
    }

    return result;
}

function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - (hours * 3600)) / 60);
    let remainingSeconds = seconds - (hours * 3600) - (minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    return hours + ":" + minutes + ":" + remainingSeconds;
}

function makeCheckpoints(checkpoints_distance, lineString) {
    for (let i = 0; i < checkpoints_distance.length; i++) {
        const Coordinate = lineString.getCoordinateAt(checkpoints_distance[i]);
        const coordinate_to4326 = utils.to4326(Coordinate);
        start_end_flag = i === 0 || i === checkpoints_distance.length - 1;
        fetch_weather(coordinate_to4326[1], coordinate_to4326[0], start_end_flag);
    }
}

function create_route(data, sections, details) {

    const excludedRanges = sections.map(item => [item.startPointIndex, item.endPointIndex]);

    const coordinates = data.map(item => [item.longitude, item.latitude]);

    // Convert the coordinates to the OpenLayers projection
    const olCoords = coordinates.map(coord => ol.proj.fromLonLat(coord));

    // Create a LineString geometry object
    const lineString = new ol.geom.LineString(olCoords);

    // Create a feature and add the LineString geometry to it
    const feature = new ol.Feature(lineString);
    feature.setStyle(styles.route);

    vectorSource.addFeature(feature);

    const subArrays = excludedRanges.map(range => {
        return coordinates.slice(range[0], range[1] + 1);
    });

    subArrays.map(item => {
        // Convert the coordinates to the OpenLayers projection
        const traffic_olCoords = item.map(coord => ol.proj.fromLonLat(coord));

        // Create a LineString geometry object
        const traffic_lineString = new ol.geom.LineString(traffic_olCoords);

        // Create a feature and add the LineString geometry to it
        const traffic_feature = new ol.Feature(traffic_lineString);
        traffic_feature.setStyle(styles.traffic_route);

        vectorSource.addFeature(traffic_feature);
    });

    // Adding checkpoints
    let lengthInMiles = Math.floor(details.lengthInMeters / 1609.344);
    let checkpoint_count = 4
    if (lengthInMiles > 5)
        checkpoint_count = 7
    let checkpoints_distance = divideRange(checkpoint_count);
    makeCheckpoints(checkpoints_distance, lineString);

    const center_coordinates = lineString.getCoordinateAt(0.5);
    const route_time_and_distance_feature = new ol.Feature({
        geometry: new ol.geom.Point(center_coordinates),
    });

    let route_time_and_distance_style = createStyle({
        textAlign: 'left',
        justify: 'center',
        route_length: (details.lengthInMeters / 1609.344).toFixed(2) + ' MILES',
        route_time: formatTime(details.travelTimeInSeconds)
    });
    route_time_and_distance_feature.setStyle(route_time_and_distance_style);
    vectorSource.addFeature(route_time_and_distance_feature);
}
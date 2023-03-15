function divideRange(n) {
    const step = 1 / (n - 1);
    const result = [];

    for (let i = 0; i < n; i++) {
        result.push(i * step);
    }

    return result;
}

function makeCheckpoints(checkpoints_distance, lineString) {
    for (let i = 0; i < checkpoints_distance.length; i++) {
        const Coordinate = lineString.getCoordinateAt(checkpoints_distance[i]);
        const coordinate_to4326 = utils.to4326(Coordinate);
        start_end_flag = i === 0 || i === checkpoints_distance.length-1;
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
    let checkpoint_count = Math.floor(details.lengthInMeters / 2000);
    if (checkpoint_count < 3)
        checkpoint_count = 3
    let checkpoints_distance = divideRange(checkpoint_count);
    makeCheckpoints(checkpoints_distance, lineString);

    const center_coordinates = lineString.getCoordinateAt(0.5);
    const center_coordinate_to4326 = utils.to4326(center_coordinates);
    const route_time_and_distance_feature = new ol.Feature({
        geometry: new ol.geom.Point(center_coordinates),
    });

    let route_time_and_distance_style = createStyle({
        textAlign: 'left',
        justify: 'center',
        route_length: (details.lengthInMeters / 1000) + 'KM',
        route_time: (details.travelTimeInSeconds / 3600).toFixed(2) + 'Hours'
    });
    route_time_and_distance_feature.setStyle(route_time_and_distance_style);
    vectorSource.addFeature(route_time_and_distance_feature);
}
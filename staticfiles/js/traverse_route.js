const speedInput = 10000
const startButton = document.getElementById('start-animation');
let animating = false;
let distance = 0;
let lastTime;
let flag = false;

function moveFeature(event) {
    const speed = Number(speedInput);
    const time = event.frameState.time;
    const elapsedTime = time - lastTime;
    distance = (distance + (speed * elapsedTime) / 1e6) % 2;
    lastTime = time;
    const currentCoordinate = map_route.getCoordinateAt(
        distance > 1 ? 2 - distance : distance
    );
    if (currentCoordinate[0].toString().slice(0, 4) == map_route.getLastCoordinate()[0].toString().slice(0, 4) &&
        currentCoordinate[1].toString().slice(0, 4) == map_route.getLastCoordinate()[1].toString().slice(0, 4)) {
        stopAnimation()
    }
    if(distance > 0.9){
        flag = true;
    }
    if (distance < 0.9 && flag){
        stopAnimation()
    }
    const currentCoordinate_to4326 = utils.to4326(currentCoordinate)
    fetch_traffic_speed(currentCoordinate_to4326[1], currentCoordinate_to4326[0], distance)
    map.render()
}

function startAnimation() {
    animating = true;
    lastTime = Date.now();
    vectorLayer.on('postrender', moveFeature);
    // trigger map render for calling the moveFeature
    map.render();
}

function stopAnimation() {
    animating = false;

    // Keep marker at current animation position
    vectorLayer.un('postrender', moveFeature);
    distance = 0;
}

startButton.addEventListener('click', function () {
    if (animating) {
        stopAnimation();
    } else {
        startAnimation();
    }
});

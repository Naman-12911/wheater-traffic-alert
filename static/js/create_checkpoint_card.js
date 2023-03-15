function create_alert_card(city, place_name, temp, description, traffic, weather_mark, weather_info) {
    const current_date = new Date();
    const date_time = current_date.getDate() + "/"
        + (current_date.getMonth() + 1) + "/"
        + current_date.getFullYear() + " @ "
        + current_date.getHours() + ":"
        + current_date.getMinutes() + ":"
        + current_date.getSeconds();

    const card = document.createElement('div');
    card.classList.add('m-2');

    const innerCard = document.createElement('div');
    innerCard.classList.add('card');

    const img = document.createElement('img');
    img.setAttribute('src', 'https://i.imgur.com/a9sHoeY.jpg');
    img.setAttribute('alt', 'Card image cap');

    const cardOverlay = document.createElement('div');
    cardOverlay.classList.add('card-img-overlay');
    cardOverlay.style.height = '110px';

    const title = document.createElement('h3');
    title.classList.add('card-title', 'text-white', 'm-b-0', 'dl');
    title.textContent = city;

    const placeName = document.createElement('small');
    placeName.classList.add('card-text', 'text-white', 'font-light');
    placeName.textContent = place_name;

    const dateTime = document.createElement('h6');
    dateTime.classList.add('card-text', 'text-success', 'font-light');
    dateTime.textContent = date_time;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'weather-small');

    const row = document.createElement('div');
    row.classList.add('row');

    const tempCol = document.createElement('div');
    tempCol.classList.add('col-8', 'b-r', 'align-self-center');

    const tempWrapper = document.createElement('div');
    tempWrapper.classList.add('d-flex');

    const tempIcon = document.createElement('div');
    tempIcon.classList.add('display-6', 'text-info');
    tempIcon.innerHTML = '<i class="mdi mdi-weather-pouring"></i>';

    const tempInfo = document.createElement('div');
    tempInfo.classList.add('m-l-20');

    const tempValue = document.createElement('h3');
    tempValue.classList.add('font-light', 'text-info', 'm-b-0');
    tempValue.innerHTML = `${temp}<sup>o</sup>`;

    const trafficValue = document.createElement('h4');
    trafficValue.classList.add('font-light', 'text-warning', 'm-b-0');
    trafficValue.innerHTML = traffic;

    const tempDescription = document.createElement('small');
    tempDescription.textContent = description;

    const tonightCol = document.createElement('div');
    tonightCol.classList.add('col-4', 'text-center');

    const tonightValue = document.createElement('div');
    tonightValue.classList.add('font-light', 'm-b-0');
    tonightValue.innerHTML = `<img src="${weather_mark}" />`;

    const tonightDescription = document.createElement('small');
    tonightDescription.textContent = `${weather_info}`;

    card.appendChild(innerCard);
    innerCard.appendChild(img);
    innerCard.appendChild(cardOverlay);
    cardOverlay.appendChild(title);
    cardOverlay.appendChild(placeName);
    innerCard.appendChild(cardBody);
    cardBody.appendChild(row);
    row.appendChild(tempCol);
    tempCol.appendChild(tempWrapper);
    tempWrapper.appendChild(tempIcon);
    tempWrapper.appendChild(tempInfo);
    tempInfo.appendChild(dateTime);
    tempInfo.appendChild(tempValue);
    tempInfo.appendChild(trafficValue);
    tempInfo.appendChild(tempDescription);
    row.appendChild(tonightCol);
    tonightCol.appendChild(tonightValue);
    tonightCol.appendChild(tonightDescription);

    return card;
}

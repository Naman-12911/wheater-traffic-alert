$("#source-search-button"
).click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    let input_destination = $("#source-search").val()
    $.ajax({
        url: "https://photon.komoot.io/api/?q=" + input_destination + "&limit=10&lang=en", success: function (t) {
            $("#source-location-list").html(``);
            t.features.map((function (t) {
                $("#source-location-list").append(`
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item alert-info-bg" type="button" data-lon="${t.geometry.coordinates[0]}" data-lat="${t.geometry.coordinates[1]}" data-name="${t.properties.name}">
                        ${t.properties.name}<br>
                        postcode: ${t.properties.postcode}<br>
                        city: ${t.properties.city}<br>
                        state: ${t.properties.state}<br>
                        country: ${t.properties.country}<br>
                    </button>
                `);
            }));
        }
    });
    // $.ajax({
    //     url: "https://nominatim.openstreetmap.org/search.php?q=" + input_destination + "&format=json&addressdetails=1&limit=5&countrycodes=&accept-language=en", success: function (t) {
    //         $("#source-location-list").html(``);
    //         t.map((function (t) {
    //             $("#source-location-list").append(`
    //                 <div class="dropdown-divider"></div>
    //                 <button class="dropdown-item alert-info-bg" type="button" data-lon="${t.lon}" data-lat="${t.lat}" data-name="${t.display_name}">
    //                     ${t.display_name}<br>
    //                     postcode: ${t.address.postcode}<br>
    //                     city: ${t.address.city || t.address.town}<br>
    //                     state: ${t.address.state}<br>
    //                     country: ${t.address.country}<br>
    //                 </button>
    //             `);
    //         }));
    //     }
    // });
});

$('#source-location-list').on('click', '.dropdown-item', function () {
    source_location = [$(this).data('lon'), $(this).data('lat')];
    map.getView().setCenter(ol.proj.transform(source_location, 'EPSG:4326', 'EPSG:3857'));
    map.getView().setZoom(15);
    utils.createSourceFeature(source_location);
    $("#source-dropdownMenu").text($(this).data('name'))
});


$("#destination-search-button").click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    let input_destination = $("#destination-search").val()
    $.ajax({
        url: "https://photon.komoot.io/api/?q=" + input_destination + "&limit=10&lang=en", success: function (t) {
            $("#destination-location-list").html(``);
            t.features.map((function (t) {
                $("#destination-location-list").append(`
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item alert-info-bg" type="button" data-lon="${t.geometry.coordinates[0]}" data-lat="${t.geometry.coordinates[1]}" data-name="${t.properties.name}">
                        ${t.properties.name}<br>
                        postcode: ${t.properties.postcode}<br>
                        city: ${t.properties.city}<br>
                        state: ${t.properties.state}<br>
                        country: ${t.properties.country}<br>
                    </button>
                `);
            }));
        }
    });
});


$('#destination-location-list').on('click', '.dropdown-item', function () {
    destination_location = [$(this).data('lon'), $(this).data('lat')];
    map.getView().setCenter(ol.proj.transform(destination_location, 'EPSG:4326', 'EPSG:3857'));
    map.getView().setZoom(15);
    utils.createDestinationFeature(destination_location);
    $("#destination-dropdownMenu").text($(this).data('name'));
});
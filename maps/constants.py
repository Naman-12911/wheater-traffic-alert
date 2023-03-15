TOMTOM_API_URL = "https://api.tomtom.com/routing/1/calculateRoute/{START}:{DESTINATION}/json?instructionsType=text&language=en-US&vehicleHeading=90&sectionType=traffic&report=effectiveSettings&routeType=eco&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleMaxSpeed=120&vehicleCommercial=false&vehicleEngineType=combustion&key={API_KEY}"
API_OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LONG}&current_weather=true"
API_OPEN_REVERSE_GEOCODING = "https://nominatim.openstreetmap.org/reverse?lat={LAT}&lon={LONG}&format=jsonv2"
TOMTOM_TRAFFIC_API_URL = "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key={API_KEY}&point={LAT},{LONG}&unit=kmph"

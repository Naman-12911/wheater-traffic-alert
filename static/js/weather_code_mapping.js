const get_weather_code = {
    "0": {
        "description": "Cloud development not observed or not observable",
        "src": sun
    },
    "1": {
        "description": "Clouds generally dissolving or becoming less developed",
        "src": fog
    },
    "2": {
        "description": "State of sky on the whole unchanged",
        "src": sun
    },
    "3": {
        "description": "Clouds generally forming or developing",
        "src": cloudy
    },
    "4": {
        "description": "Visibility reduced by smoke, e.g. veldt or forest fires, industrial smoke or volcanic ashes",
        "src": fog
    },
    "5": {
        "description": "Haze",
        "src": fog
    },
    "6": {
        "description": "Widespread dust in suspension in the air, not raised by wind at or near the station at the time of observation",
        "src": fog
    },
    "7": {
        "description": "Dust or sand raised by wind at or near the station at the time of observation, but no well developed dust whirl(s) or sand whirl(s), and no duststorm or sandstorm seen",
        "src": wind
    },
    "8": {
        "description": "Well developed dust whirl(s) or sand whirl(s) seen at or near the station during the preceding hour or at the time ot observation, but no duststorm or sandstorm",
        "src": wind
    },
    "9": {
        "description": "Duststorm or sandstorm within sight at the time of observation, or at the station during the preceding hour",
        "src": wind
    },
    "10": {
        "description": "Mist",
        "src": fog
    },
    "11": {
        "description": "Patches shallow fog or ice fog at the station, whether on land or sea, not deeper than about 2 metres on land or 10 metres at sea",
        "src": fog
    },
    "12": {
        "description": "More or less continuous shallow fog or ice fog at the station, whether on land or sea, not deeper than about 2 metres on land or 10 metres at sea",
        "src": fog
    },
    "13": {
        "description": "Lightning visible, no thunder heard",
        "src": cloudy
    },
    "14": {
        "description": "Precipitation within sight, not reaching the ground or the surface of the sea",
        "src": rain
    },
    "15": {
        "description": "Precipitation within sight, reaching the ground or the surface of the sea, but distant, i.e. estimated to be more than 5 km from the station",
        "src": rain
    },
    "16": {
        "description": "Precipitation within sight, reaching the ground or the surface of the sea, near to, but not at the station",
        "src": rain
    },
    "17": {
        "description": "Thunderstorm, but no precipitation at the time of observation",
        "src": storm
    },
    "18": {
        "description": "Squalls at or within sight of the station during the preceding hour or at the time of observation",
        "src": storm
    },
    "19": {
        "description": "Funnel clouds at or within sight of the station during the preceding hour or at the time of observation",
        "src": storm
    },
    "20": {
        "description": "Drizzle (not freezing) or snow grains, not falling as shower",
        "src": snow
    },
    "21": {
        "description": "Rain (not freezing)",
        "src": rain
    },
    "22": {
        "description": "Snow",
        "src": snow
    },
    "23": {
        "description": "Rain and snow or ice pellets",
        "src": snow
    },
    "24": {
        "description": "Freezing drizzle or freezing rain",
        "src": rain
    },
    "25": {
        "description": "Shower(s) of rain",
        "src": rain
    },
    "26": {
        "description": "Shower(s) of snow, or of rain and snow",
        "src": snow
    },
    "27": {
        "description": "Shower(s) of hail*, or of rain and hail*",
        "src": rain
    },
    "28": {
        "description": "Fog or ice fog",
        "src": fog
    },
    "29": {
        "description": "Thunderstorm (with or without precipitation)",
        "src": storm
    },
    "30": {
        " description": "Slight or moderate duststorm or sandstorm",
        "src": storm
    },
    "31": {
        " description": "Slight or moderate duststorm or sandstorm",
        "src": storm
    },
    "32": {
        " description": "Slight or moderate duststorm or sandstorm",
        "src": storm
    },
    "33": {
        " description": "Severe duststorm or sandstorm",
        "src": storm
    },
    "34": {
        " description": "Severe duststorm or sandstorm",
        "src": storm
    },
    "35": {
        " description": "Severe duststorm or sandstorm",
        "src": storm
    },
    "36": {
        " description": "Slight or moderate blowing snow",
        "src": snow
    },
    "37": {
        " description": "Heavy drifting snow",
        "src": snow
    },
    "38": {
        " description": "Slight or moderate blowing snow",
        "src": snow
    },
    "39": {
        " description": "Heavy drifting snow",
        "src": snow
    },
    "40": {
        " description": "Fog or ice fog at a distance at the time of observation, but not at the station during the preceding hour, the fog or ice fog extending to a level above that of the observer",
        "src": fog
    },
    "41": {
        " description": "Fog or ice fog in patches",
        "src": fog
    },
    "42": {
        " description": "Fog or ice fog, sky visible, has become thinner during the preceding hour",
        "src": fog
    },
    "43": {
        " description": "Fog or ice fog, sky invisible",
        "src": fog
    },
    "44": {
        " description": "Fog or ice fog, sky visible, no appreciable change during the preceding hour",
        "src": fog
    },
    "45": {
        " description": "Fog or ice fog, sky invisible",
        "src": fog
    },
    "46": {
        " description": "Fog or ice fog, sky visible, has begun or has become thicker during the preceding hour",
        "src": fog
    },
    "47": {
        " description": "Fog or ice fog, sky invisible",
        "src": fog
    },
    "48": {
        " description": "Fog, depositing rime, sky visible",
        "src": fog
    },
    "49": {
        " description": "Fog, depositing rime, sky invisible",
        "src": fog
    },
    "50": {
        " description": "Drizzle, not freezing, intermittent, slight at time of observation",
        "src": rain
    },
    "51": {
        " description": "Drizzle, not freezing, continuous",
        "src": rain
    },
    "52": {
        " description": "Drizzle, not freezing, intermittent, moderate at time of observation",
        "src": rain
    },
    "53": {
        " description": "Drizzle, not freezing, continuous",
        "src": rain
    },
    "54": {
        " description": "Drizzle, not freezing, intermittent, heavy (dense) at time of observation",
        "src": rain
    },
    "55": {
        " description": "Drizzle, not freezing, continuous",
        "src": rain
    },
    "56": {
        " description": "Drizzle, freezing, slight",
        "src": rain
    },
    "57": {
        " description": "Drizzle, freezing, moderate or heavy (dence)",
        "src": rain
    },
    "58": {
        " description": "Drizzle and rain, slight",
        "src": rain
    },
    "59": {
        " description": "Drizzle and rain, moderate or heavy",
        "src": rain
    },
    "60": {
        "description": "Rain, not freezing, intermittent, slight at time of observation",
        "src": rain
    },
    "61": {
        "description": "Rain, not freezing, continuous",
        "src": rain
    },
    "62": {
        "description": "Rain, not freezing, intermittent, moderate at time of observation",
        "src": rain
    },
    "63": {
        "description": "Rain, not freezing, continuous",
        "src": rain
    },
    "64": {
        "description": "Rain, not freezing, intermittent, heavy at time of observation",
        "src": rain
    },
    "65": {
        "description": "Rain, not freezing, continuous",
        "src": rain
    },
    "66": {
        "description": "Rain, freezing, slight",
        "src": rain
    },
    "67": {
        "description": "Rain, freezing, moderate or heavy (dence)",
        "src": rain
    },
    "68": {
        "description": "Rain or drizzle and snow, slight",
        "src": rain
    },
    "69": {
        "description": "Rain or drizzle and snow, moderate or heavy",
        "src": rain
    },
    "70": {
        "description": "Intermittent fall of snowflakes, slight at time of observation",
        "src": snow
    },
    "71": {
        "description": "Continuous fall of snowflakes",
        "src": snow
    },
    "72": {
        "description": "Intermittent fall of snowflakes, moderate at time of observation",
        "src": snow
    },
    "73": {
        "description": "Continuous fall of snowflakes",
        "src": snow
    },
    "74": {
        "description": "Intermittent fall of snowflakes, heavy at time of observation",
        "src": snow
    },
    "75": {
        "description": "Continuous fall of snowflakes",
        "src": snow
    },
    "76": {
        "description": "Diamond dust (with or without fog)",
        "src": fog
    },
    "77": {
        "description": "Snow grains (with or without fog)",
        "src": snow
    },
    "78": {
        "description": "Isolated star-like snow crystals (with or without fog)",
        "src": snow
    },
    "79": {
        "description": "Ice pellets",
        "src": snow
    },
    "80": {
        "description": "Rain shower(s), slight",
        "src": rain
    },
    "81": {
        "description": "Rain shower(s), moderate or heavy",
        "src": rain
    },
    "82": {
        "description": "Rain shower(s), violent",
        "src": rain
    },
    "83": {
        "description": "Shower(s) of rain and snow mixed, slight",
        "src": rain
    },
    "84": {
        "description": "Shower(s) of rain and snow mixed, moderate or heavy",
        "src": rain
    },
    "85": {
        "description": "Snow shower(s), slight",
        "src": snow
    },
    "86": {
        "description": "Snow shower(s), moderate or heavy",
        "src": snow
    },
    "87": {
        "description": "Shower(s) of snow pellets or small hail, with or without rain or rain and snow mixed, slight",
        "src": snow
    },
    "88": {
        "description": "Shower(s) of snow pellets or small hail, with or without rain or rain and snow mixed, moderate or heavy",
        "src": snow
    },
    "89": {
        "description": "Shower(s) of hail, with or without rain or rain and snow mixed, not associated with thunder, slight",
        "src": snow
    },
    "90": {
        "description": "Shower(s) of hail, with or without rain or rain and snow mixed, not associated with thunder, moderate or heavy",
        "src": snow
    },
    "91": {
        "description": "Slight rain at time of observation, thunderstorm during the preceding hour but not at time of observation",
        "src": rain
    },
    "92": {
        "description": "Moderate or heavy rain at time of observation, thunderstorm during the preceding hour but not at time of observation",
        "src": rain
    },
    "93": {
        "description": "Slight snow, or rain and snow mixed or hail, at time of observation, thunderstorm during the preceding hour but not at time of observation",
        "src": rain
    },
    "94": {
        "description": "Moderate or heavy snow, or rain and snow mixed or hail, at time of observation, thunderstorm during the preceding hour but not at time of observation",
        "src": snow
    },
    "95": {
        "description": "Thunderstorm, slight or moderate, without hail but with rain and/or snow at time of observation, thunderstorm at time of observation",
        "src": storm
    },
    "96": {
        "description": "Thunderstorm, slight or moderate, with hail at time of observation, thunderstorm at time of observation",
        "src": storm
    },
    "97": {
        "description": "Thunderstorm, heavy, without hail but with rain and/or snow at time of observation, thunderstorm at time of observation",
        "src": storm
    },
    "98": {
        "description": "Thunderstorm combined with duststorm or sandstorm at time of observation, thunderstorm at time of observation",
        "src": storm
    },
    "99": {
        "description": "Thunderstorm, heavy, with hail at time of observation, thunderstorm at time of observation",
        "src": storm
    }
}
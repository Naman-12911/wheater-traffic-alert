import requests
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render

from maps.constants import TOMTOM_API_URL, API_OPEN_METEO_URL


@login_required
def render_map(request):
    return render(request, 'maps/index.html')


def fetch_traffic_flow(request, lat, long):
    try:
        api_url = TOMTOM_API_URL.format(API_KEY=settings.TOMTOM_MAP_APIKEY, LAT=lat, LONG=long)
        response = requests.get(api_url)
        json_result = response.json()
    except Exception:
        json_result = {
            'flowSegmentData': {
                'currentSpeed': 40
            }
        }

    try:
        weather_url = API_OPEN_METEO_URL.format(LAT=lat, LONG=long)
        weather_response = requests.get(weather_url)
        weather_json_result = weather_response.json()
    except Exception:
        weather_json_result = {
            'current_weather': {
                'weathercode': 0
            }
        }
    return JsonResponse({'speed': json_result['flowSegmentData']['currentSpeed'],
                         'weather_code': weather_json_result['current_weather']['weathercode']})


def about_page(request):
    return render(request, 'maps/about.html')
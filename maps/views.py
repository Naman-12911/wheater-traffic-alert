import requests
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render

from maps.constants import TOMTOM_API_URL, API_OPEN_METEO_URL, API_OPEN_REVERSE_GEOCODING, TOMTOM_TRAFFIC_API_URL


@login_required
def render_map(request):
    return render(request, 'maps/index.html')


def fetch_route_with_traffic(request, start, destination):
    api_url = TOMTOM_API_URL.format(API_KEY=settings.TOMTOM_MAP_APIKEY, START=start, DESTINATION=destination)
    response = requests.get(api_url)
    if response.status_code != 200:
        return JsonResponse({'status': 'Failed to fetch route, please check your daily TOMTOM api usage.'})
    json_result = response.json()
    try:
        data = json_result['routes'][0]['legs'][0]['points']
    except KeyError as e:
        data = []
    try:
        sections = json_result['routes'][0]['sections']
    except KeyError as e:
        sections = []
    try:
        details = json_result['routes'][0]['summary']
    except KeyError as e:
        details = {}
    return JsonResponse({'status': 'ok',
                         'points': data,
                         'sections': sections,
                         'details': details})


def fetch_weather(request, lat, long):
    try:
        weather_url = API_OPEN_METEO_URL.format(LAT=lat, LONG=long)
        weather_response = requests.get(weather_url)
        weather_json_result = weather_response.json()
        print(weather_json_result)
    except Exception as e:
        print(e)
        weather_json_result = {
            'current_weather': {
                'weathercode': 0,
                'temperature': 30.0
            }
        }
    try:
        reverse_geo_coding_url = API_OPEN_REVERSE_GEOCODING.format(LAT=lat, LONG=long)
        location = requests.get(reverse_geo_coding_url)
        location_json_result = location.json()
    except Exception as e:
        print(e)
        location_json_result = {}
    try:
        api_url = TOMTOM_TRAFFIC_API_URL.format(API_KEY=settings.TOMTOM_MAP_APIKEY, LAT=lat, LONG=long)
        response = requests.get(api_url)
        json_result = response.json()
        if response.status_code != 200:
            raise Exception
    except Exception as e:
        print(e)
        json_result = {
            'flowSegmentData': {
                'currentSpeed': 40
            }
        }
    return JsonResponse({'status': 'ok',
                         'weather_code': weather_json_result['current_weather']['weathercode'],
                         'temperature': weather_json_result['current_weather']['temperature'],
                         'location_details': location_json_result,
                         'traffic_speed': json_result['flowSegmentData']['currentSpeed']})


def about_page(request):
    return render(request, 'maps/about.html')

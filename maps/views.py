from django.shortcuts import render


# Create your views here.
def render_map(request):
    return render(request, 'maps/index.html')

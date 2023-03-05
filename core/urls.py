from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from django.urls import path
from users import views as users_views
from maps import views as maps_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', users_views.home, name='users-home'),
    path('profile/', users_views.profile, name='profile'),
    path('register/', users_views.register, name='register'),
    path('login/',
         auth_views.LoginView.as_view(template_name='users/login.html', redirect_authenticated_user=True),
         name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='users/logout.html'), name='logout'),
    path('map/', maps_views.render_map, name='map'),
    path('about/', maps_views.about_page, name='about'),
    path('map/<str:lat>/<str:long>/', maps_views.fetch_traffic_flow, name='fetch-traffic-speed'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

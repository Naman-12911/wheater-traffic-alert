from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from django.urls import path
from users import views as users_views
from maps import views as maps_views


from django.urls import path
from users.views import MyObtainTokenPairView, RegisterView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter
from users import views

router = DefaultRouter()
# router.register(r'product', ProductViewSet, basename='Product')
# router.register(r'image', ImageViewSet, basename='Image')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', users_views.home, name='users-home'),
    path('profile/', users_views.profile, name='profile'),
    path('register/', users_views.register, name='register'),
    path('login/',
         auth_views.LoginView.as_view(template_name='users/login.html', redirect_authenticated_user=True),
         name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='users/logout.html'), name='logout'),
    path('map/', maps_views.render_map, name='map'),
    path('about/', maps_views.about_page, name='about'),
    path('map/<str:start>/<str:destination>/', maps_views.fetch_route_with_traffic, name='fetch-route-with-traffic'),
    path('map/weather/<str:lat>/<str:long>/', maps_views.fetch_weather, name='fetch-weather'),

# apis urls
    path('loginapi/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('registerapi/', RegisterView.as_view(), name='auth_register'),
    #path('article/', views.ProfileDetailAPIView.as_view()),
    path('profileapi/<int:pk>/', views.ProfileDetailAPIView.as_view())
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

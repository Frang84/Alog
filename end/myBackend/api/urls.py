from django.urls import path 
from . import views 
from .views import UserProfileView


urlpatterns = [
    path('', views.getData),
    path('details', UserProfileView.as_view())
]
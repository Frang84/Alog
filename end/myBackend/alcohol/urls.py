from django.urls import path 
from .views import getData, UserProfileView

urlpatterns = [
    #path('', views.getData),
    path('details', UserProfileView.as_view()),
    path('add', EventView.as_view())
]
from django.urls import path 
from .views import getData, UserProfileView, EventView

urlpatterns = [
    #path('', views.getData),
    path('details', UserProfileView.as_view()),
    path('add', EventView.as_view())
]
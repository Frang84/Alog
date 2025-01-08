from django.urls import path 
#from  import getData, UserProfileView, EventView


from .viewsDir import viewsEvent
from .viewsDir import viewsStats, viewsChellange




urlpatterns = [
    #path('', views.getData),
    path('details', viewsEvent.UserProfileView.as_view()),
    path('add', viewsEvent.EventView.as_view()),
    path('stats', viewsStats.StatsView.as_view()),
    path('challanges', viewsChellange.ChallangeView.as_view())
]
from django.urls import path 
#from  import getData, UserProfileView, EventView



from .viewsDir import viewsStats, viewsChellange, viewsHangover,viewsEvent




urlpatterns = [
    #path('', views.getData),
    path('details', viewsEvent.UserProfileView.as_view()),
    path('add', viewsEvent.EventView.as_view()),
    path('stats', viewsStats.StatsView.as_view()),
    path('challanges', viewsChellange.ChallangeView.as_view()),
    path('hangovers', viewsHangover.HangoverView.as_view()),
]
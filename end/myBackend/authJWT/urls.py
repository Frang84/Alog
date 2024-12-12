from django.urls import path 
from .views import RegisterView

urlpatterns = [
    #path('', Home.as_view()),
    path('register', RegisterView.as_view())
]


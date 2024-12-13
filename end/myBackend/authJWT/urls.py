from django.urls import path 
from .views import RegisterView, LoginView

urlpatterns = [
    #path('', Home.as_view()),
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view())
]


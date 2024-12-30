urlpatterns = [
    path('', views.getData),
    path('details', UserProfileView.as_view())
]
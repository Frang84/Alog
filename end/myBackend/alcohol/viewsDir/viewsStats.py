
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from rest_framework import status
from alcohol.models import Alcohol, Event
import datetime
import json 
class StatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request): 
        
        startDate = self.getDate(request.data.get('startDate'))
        endDate = self.getDate(request.data.get('endDate'))
        user = User.objects.filter(id=request.user.id).first()
        events = Event.objects.all().filter(userId=user)
        eventsList = list(events.values())
        return Response(
            {
                "events": eventsList
            }
        )

    def getDate(self, date):
        ymd = date.split('/')
        year = int(ymd[2])
        month = int(ymd[1])
        day = int(ymd[0])
        return datetime.datetime(year, month, day)  
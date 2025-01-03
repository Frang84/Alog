
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.db import connection
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
        events = Event.objects.all().filter(userId=user, date__gte=startDate, date__lte=endDate)
        eventsList = list(events.values())
        print(self.join())
        return Response(
            {
                "events": eventsList
            }
        )

    def join(self): 
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM alcohol_event INNER JOIN alcohol_alcohol ON alcohol_event.alcohol_id = alcohol_alcohol.id")
            row = cursor.fetchall()
            return row

    def getDate(self, date):
        ymd = date.split('/')
        year = int(ymd[2])
        month = int(ymd[1])
        day = int(ymd[0])
        return datetime.datetime(year, month, day)  
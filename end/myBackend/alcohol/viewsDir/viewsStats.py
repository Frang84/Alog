
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.db import connection
from rest_framework import status
from alcohol.modelsDir.models import Alcohol, Event
import datetime
import json 
from alcohol.modelsDir.stats import Stats
class StatsView(APIView):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.stats =  Stats()


    permission_classes = [IsAuthenticated]
    __groupByDict = {'Day' : "STRFTIME('%H', date)",'Week' : "STRFTIME('%d-%m-%Y', date)", 'Month' : "STRFTIME('%m', date)", 'Year' : "STRFTIME('%Y', date)"}
    def post(self, request): 
        
        startDate = str(self.getDate(request.data.get('startDate')))
        endDate = str(self.getDate(request.data.get('endDate'), 'e')) 
        timeSpan = str(request.data.get('timeSpan'))

        totalAlcoholPriceStats = self.stats.totalAlcoholPrice(request.user.id, self.__groupByDict[timeSpan], startDate, endDate)
        totalAlcoholPriceStats = [{ 'period': row[0], 'totalPrice': row[1], 'totalAlcohol': row[2]} for row in totalAlcoholPriceStats]


        preferAlcoTypeStats = self.stats.preferedAlcoType(request.user.id, startDate, endDate)
        preferAlcoTypeStats = [{'alcoholType' : row[0], 'volume':  row[1]} for row in preferAlcoTypeStats]


        avgAlcoholPercentageStats = self.stats.avgAlcoholPercentage(request.user.id, startDate, endDate)[0][0]

        totalAlcoholConsumption1 = self.stats.totalAlcoholConsumption(request.user.id, startDate, endDate)[0][0]

        preferedEventTypeStats = self.stats.preferedEventType(request.user.id, startDate, endDate)
        preferedEventTypeStats = [ {'eventType': row[0], 'volume':  row[1]} for row in preferedEventTypeStats]

        drinkingHoursStats = self.stats.drinkingHours(request.user.id, startDate, endDate)
        drinkingHoursStats = [{'time': row[0],'volume':  row[1]} for row in drinkingHoursStats]

        hangoversStats = self.stats.hangovers(request.user.id, startDate, endDate)
        hangoversStats = [{'hangoverType': row[0], 'count': row[1]} for row in hangoversStats]
        
        return Response(
            {
                "totalAlcoholPriceStats": totalAlcoholPriceStats,
                "preferAlcoTypeStats": preferAlcoTypeStats,
                "avgAlcoholPercentageStats": avgAlcoholPercentageStats,
                "preferedEventTypeStats": preferedEventTypeStats,
                "drinkingHoursStats": drinkingHoursStats,
                "totalAlcoholConsumption": totalAlcoholConsumption1,
                'hangoverStats': hangoversStats
            }
        )


 

        

    def getDate(self, date, opt='s'):
        print(date)
        ymd = date.split('/')
        year = int(ymd[2])
        month = int(ymd[1])
        day = int(ymd[0])
        if opt == 'e': 
            return datetime.datetime(year, month, day, 23,59,59)  
        return datetime.datetime(year, month, day)  
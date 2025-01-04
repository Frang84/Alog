
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
        
        startDate = self.interDate(str(self.getDate(request.data.get('startDate'))))
        endDate =self.interDate(str(self.getDate(request.data.get('endDate'))))
        print(startDate)
        print(endDate)
        totalAlcoholPriceStats = self.totalAlcoholPrice(request.user.id, "STRFTIME('%m', date)", startDate, endDate)
        preferAlcoTypeStats = self.preferedAlcoType(request.user.id, startDate, endDate)
        avgAlcoholPercentageStats = self.avgAlcoholPercentage(request.user.id, startDate, endDate)
        preferedEventTypeStats = self.preferedEventType(request.user.id, startDate, endDate)
        
        return Response(
            {
                "alcoholPriceStats": totalAlcoholPriceStats,
                "preferAlcoTypeStats": preferAlcoTypeStats,
                "avgAlcoholPercentageStats": avgAlcoholPercentageStats,
                "preferedEventTypeStats": preferedEventTypeStats
            }
        )

    def totalAlcoholPrice(self, userId, groupBy, startDate, endDate): 
        '''funckaj wylicza calkowity alkohol i cene dla kazdego dnia w podanym przedziale czasowym'''
        with connection.cursor() as cursor:
            cursor.execute(f"""
            SELECT  {groupBy}, SUM(price) as totalPrice, SUM(volume * percentage/100) as totalAlcohol
            FROM alcohol_event 
            INNER JOIN alcohol_alcohol ON alcohol_event.alcohol_id = alcohol_alcohol.id
            WHERE alcohol_event.userId_id = {userId} AND date BETWEEN '{startDate}' AND '{endDate}'
            GROUP BY {groupBy}
            """)
            row = cursor.fetchall()
            return row
    def preferedAlcoType(self, userId, startDate, endDate): 
        '''oblicza jaki udzial procentowy po przeliczeniu na czysty spirytus ma dany typ alkocholu w podanym przedziale czasowym'''
        with connection.cursor() as cursor:
            cursor.execute(f"""
            SELECT alcoholType,  SUM(volume * percentage/100) 
            as alcoTypePercentage
            FROM alcohol_event 
            INNER JOIN alcohol_alcohol ON alcohol_event.alcohol_id = alcohol_alcohol.id
            WHERE alcohol_event.userId_id = {userId} AND date BETWEEN '{startDate}' AND '{endDate}'
            GROUP BY alcoholType
            """)
            row = cursor.fetchall()
            return row

    def preferedEventType(self, userId, startDate, endDate): 
        '''oblicza jaki udzial procentowy po przeliczeniu na czysty spirytus ma dany typ alkocholu w podanym przedziale czasowym'''
        with connection.cursor() as cursor:
            cursor.execute(f"""
            SELECT eventName,  SUM(volume * percentage/100) 
            as alcoTypePercentage
            FROM alcohol_event 
            INNER JOIN alcohol_alcohol ON alcohol_event.alcohol_id = alcohol_alcohol.id
            WHERE alcohol_event.userId_id = {userId} AND date BETWEEN '{startDate}' AND '{endDate}'
            GROUP BY eventName
            """)
            row = cursor.fetchall()
            return row

    def avgAlcoholPercentage(self, userId, startDate, endDate):
        '''oblicza sredni procent alkocholu wypitego w podanym przedziale czasowym'''
        with connection.cursor() as cursor:
            cursor.execute(f"""
            SELECT AVG(percentage) as avgPercentage
            FROM alcohol_event 
            INNER JOIN alcohol_alcohol ON alcohol_event.alcohol_id = alcohol_alcohol.id
            WHERE alcohol_event.userId_id = {userId} AND date BETWEEN '{startDate}' AND '{endDate}'
            """)
            row = cursor.fetchall()
            return row

    
    def interDate(self, date):
        
        return date.replace('-', '')
 
        
        

    def getDate(self, date):
        ymd = date.split('/')
        year = int(ymd[2])
        month = int(ymd[1])
        day = int(ymd[0])
        return datetime.datetime(year, month, day)  
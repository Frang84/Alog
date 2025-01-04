
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

        alcoholPriceStats = self.totalAlcoholPrice(request.user.id, startDate, endDate)
        preferAlcoTypeStats = self.preferedAlcoType(request.user.id, startDate, endDate)
        #print(alcoholPriceStats)
        return Response(
            {
                "alcoholPriceStats": alcoholPriceStats,
                "preferAlcoTypeStats": preferAlcoTypeStats
            }
        )

    def totalAlcoholPrice(self, userId, startDate, endDate): 
        '''funckaj wylicza calkowity alkohol i cene dla kazdego dnia w podanym przedziale czasowym'''
        with connection.cursor() as cursor:
            cursor.execute(f"""SELECT  date, SUM(price) as totalPrice, SUM(volume * percentage/100) as totalAlcohol
            FROM alcohol_event 
            INNER JOIN alcohol_alcohol ON alcohol_event.alcohol_id = alcohol_alcohol.id
            WHERE alcohol_event.userId_id = {userId} AND date BETWEEN '{startDate}' AND '{endDate}'
            GROUP BY date
            """)
            row = cursor.fetchall()
            return row
    def preferedAlcoType(self, userId, startDate, endDate): 
        '''oblicza jaki udzial procentowy po przeliczeniu na czysty spirytus ma dany typ alkocholu w podanym przedziale czasowym'''
        with connection.cursor() as cursor:
            cursor.execute(f"""SELECT alcoholType,  SUM(volume * percentage/100) / 
                (SELECT SUM(volume * percentage/100) 
                FROM alcohol_event 
                INNER JOIN alcohol_alcohol ON alcohol_event.alcohol_id = alcohol_alcohol.id
                WHERE alcohol_event.userId_id = {userId} AND date BETWEEN '{startDate}' AND '{endDate}' )
            as alcoTypePercentage
            FROM alcohol_event 
            INNER JOIN alcohol_alcohol ON alcohol_event.alcohol_id = alcohol_alcohol.id
            WHERE alcohol_event.userId_id = {userId} AND date BETWEEN '{startDate}' AND '{endDate}'
            GROUP BY alcoholType
            """)
            row = cursor.fetchall()
            return row


    def interDate(self, date):
        return date.translate('-')
 
        
        

    def getDate(self, date):
        ymd = date.split('/')
        year = int(ymd[2])
        month = int(ymd[1])
        day = int(ymd[0])
        return datetime.datetime(year, month, day)  
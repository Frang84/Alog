
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
    __groupByDict = {'Day' : "STRFTIME('%d', date)", 'Month' : "STRFTIME('%m', date)", 'Year' : "STRFTIME('%Y', date)"}
    def post(self, request): 
        
        startDate = str(self.getDate(request.data.get('startDate'))).replace('-', '')
        endDate = str(self.getDate(request.data.get('endDate'))).replace('-', '')

        totalAlcoholPriceStats = self.totalAlcoholPrice(request.user.id, self.__groupByDict['Day'], startDate, endDate)
        totalAlcoholPriceStats = [{ 'period': row[0], 'totalPrice': row[1], 'totalAlcohol': row[2]} for row in totalAlcoholPriceStats]

##################
        preferAlcoTypeStats = self.preferedAlcoType(request.user.id, startDate, endDate)
        preferAlcoTypeStats = [{'alcoholType' : row[0], 'volume':  row[1]} for row in preferAlcoTypeStats]
##################

        avgAlcoholPercentageStats = self.avgAlcoholPercentage(request.user.id, startDate, endDate)[0][0]

        preferedEventTypeStats = self.preferedEventType(request.user.id, startDate, endDate)
        preferedEventTypeStats = [ {'eventType': row[0], 'volume':  row[1]} for row in preferedEventTypeStats]

        drinkingHoursStats = self.drinkingHours(request.user.id, startDate, endDate)
        drinkingHoursStats = [{'time': row[0],'volume':  row[1]} for row in drinkingHoursStats]
        
        return Response(
            {
                "totalAlcoholPriceStats": totalAlcoholPriceStats,
                "preferAlcoTypeStats": preferAlcoTypeStats,
                "avgAlcoholPercentageStats": avgAlcoholPercentageStats,
                "preferedEventTypeStats": preferedEventTypeStats,
                "drinkingHoursStats": drinkingHoursStats
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
            ORDER BY {groupBy}
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

    def drinkingHours(self, userId, startDate, endDate):
        '''oblicza sredni procent alkocholu wypitego w podanym przedziale czasowym'''
        with connection.cursor() as cursor:
            cursor.execute(f"""
            SELECT STRFTIME('%H', date) as timeOfDrinking, SUM(volume * percentage/100) as totalAlcohol
            FROM alcohol_event 
            INNER JOIN alcohol_alcohol ON alcohol_event.alcohol_id = alcohol_alcohol.id
            WHERE alcohol_event.userId_id = {userId} AND date BETWEEN '{startDate}' AND '{endDate}'
            GROUP BY STRFTIME('%H', date) 
            """)
            row = cursor.fetchall()
            return row
    

 
        
        

    def getDate(self, date):
        ymd = date.split('/')
        year = int(ymd[2])
        month = int(ymd[1])
        day = int(ymd[0])
        return datetime.datetime(year, month, day)  
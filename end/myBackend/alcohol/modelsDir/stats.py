
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.db import connection
from rest_framework import status

import datetime
import json 





def totalAlcoholPrice(userId, groupBy, startDate, endDate): 
    '''funckaj wylicza calkowity alkohol i cene dla kazdego dnia w podanym przedziale czasowym'''
    with connection.cursor() as cursor:
        cursor.execute(f"""
        SELECT  {groupBy}, SUM(price) as totalPrice, SUM(volume * percentage/100) as totalAlcohol
        FROM alcohol_event 
        INNER JOIN alcohol_alcohol ON alcohol_event.alcohol_id = alcohol_alcohol.id
        WHERE alcohol_event.userId_id = {userId} AND (date BETWEEN '{startDate}' AND '{endDate}')
        GROUP BY {groupBy}
        ORDER BY {groupBy}
        """)
        row = cursor.fetchall()
        return row

def preferedAlcoType( userId, startDate, endDate): 
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

def preferedEventType( userId, startDate, endDate): 
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

def avgAlcoholPercentage( userId, startDate, endDate):
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

def totalAlcoholConsumption( userId, startDate, endDate):
    with connection.cursor() as cursor:
        cursor.execute(f"""
            SELECT SUM(volume * percentage/100)  
            FROM alcohol_event 
            INNER JOIN alcohol_alcohol ON alcohol_event.alcohol_id = alcohol_alcohol.id
            WHERE alcohol_event.userId_id = {userId} AND date BETWEEN '{startDate}' AND '{endDate}'
        """)
        row = cursor.fetchall()
        return row

def drinkingHours(userId, startDate, endDate):
    '''zwraca w jakich godzinach pijemy alkohol'''
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

def hangovers(userId, startDate, endDate): 
    '''zwraca ilosc kacy'''
    with connection.cursor() as cursor:
        cursor.execute(f"""
            SELECT h.hangoverType, COUNT(h.hangoverType)
            FROM alcohol_hangover AS h
            WHERE user_id = {userId} AND date BETWEEN '{startDate}' AND '{endDate}'
            GROUP BY h.hangoverType
        """)
        row = cursor.fetchall()
        return row
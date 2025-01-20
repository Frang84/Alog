
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.db import connection
from rest_framework import status
from alcohol.modelsDir.models import Alcohol, Event, Challange
import datetime
import pytz




class ChallangeProc: 


    def getChallanges(self, userId): 
        with connection.cursor() as cursor:
            cursor.execute(f"""
            SELECT 
                alcohol_challange.startDate,
                alcohol_challange.endDate,
                alcohol_challange.chellangeType,
                IFNULL(SUM(alcohol_alcohol.volume * alcohol_alcohol.percentage / 100), 0) AS overallAlc,
                alcohol_challange.limitAlc AS limitOfAlcohol
            FROM alcohol_challange
            LEFT JOIN alcohol_event 
                ON alcohol_challange.user_id = alcohol_event.userId_id
                AND alcohol_event.date BETWEEN alcohol_challange.startDate AND alcohol_challange.endDate
            LEFT JOIN alcohol_alcohol  
                ON alcohol_alcohol.id = alcohol_event.alcohol_id
            WHERE 
                alcohol_challange.user_id = {userId}
            GROUP BY alcohol_challange.id;
            """)
            row = cursor.fetchall()
            return row
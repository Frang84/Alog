
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.db import connection
from rest_framework import status

import datetime
import pytz



class Add: 

    def totalAlcoholConsumption(self, userId, startDate, endDate):

        with connection.cursor() as cursor:
            cursor.execute(f"""
                SELECT SUM(volume * percentage/100)  
                FROM alcohol_event 
                INNER JOIN alcohol_alcohol ON alcohol_event.alcohol_id = alcohol_alcohol.id
                WHERE alcohol_event.userId_id = {userId} AND date BETWEEN '{startDate}' AND '{endDate}'
            """)
            row = cursor.fetchone()
            return row

    def isTooMuch(self, userId): 
        today = datetime.datetime.now()
        startDate = today - datetime.timedelta(days=7)
        alcoholConsumption = self.totalAlcoholConsumption( userId, startDate, today ) 
        if alcoholConsumption[0] < 355.0: 
            return 'alcohol created successfully'
        else: 
            return 'you drink too much'
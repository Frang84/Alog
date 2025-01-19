from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.db import connection
from rest_framework import status
from alcohol.modelsDir.models import Hangover
import datetime
import pytz




class Hangover:

    def getHangovers(self, userId):
        with connection.cursor() as cursor:
            cursor.execute(f"""
            SELECT
                id, 
                date, 
                hangoverType
            FROM alcohol_hangover
            WHERE user_id = {userId}
            ORDER BY date DESC
            """)
            row = cursor.fetchall()
            return row
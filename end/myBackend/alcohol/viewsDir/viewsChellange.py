from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.db import connection
from rest_framework import status
from alcohol.modelsDir.models import Alcohol, Event, Challange
from alcohol.modelsDir.challanges import ChallangeProc
import datetime
import pytz


class ChallangeView(APIView): 
    permission_classes = [IsAuthenticated]

    def __init__(self, **kwargs): 
        super().__init__(**kwargs)
        self.challange = ChallangeProc()
        

    def post(self, request): 
        try: 
            userId = request.user.id 
            user = User.objects.all().filter(id = userId).first()
            limit = request.data.get("limit")
            challangeType = request.data.get("challangeType")
            startDate = self.getDate(request.data.get("startDate"))        
            endDate = self.getDate(request.data.get("endDate"))
            Challange.objects.create(user=user, limitAlc=limit, chellangeType=challangeType, startDate=startDate, endDate=endDate)
            return Response({'message': 'Challange created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return  Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request): 
        
        challanges = self.challange.getChallanges(request.user.id)
        challangesList = [{'startDate': row[0], 'endDate':  row[1], 'challangeType':  row[2], 'overallAlc':  row[3], 'limit': row[4]} for row in challanges]
        return Response(
            {
            'challangesList': challangesList
            }
        )






    
    def getDate(self, date, opt='s'):
        print(date)
        ymd = date.split('-')
        year = int(ymd[0])
        month = int(ymd[1])
        day = int(ymd[2])
        if opt == 'e': 
            return datetime.datetime(year, month, day, 23,59,59)  
        return datetime.datetime(year, month, day)  
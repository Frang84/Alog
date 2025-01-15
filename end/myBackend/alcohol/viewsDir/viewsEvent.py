from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.db import connection
from rest_framework import status
from alcohol.models import Alcohol, Event
import datetime
import pytz



@api_view(['GET'])
def getData(request): 
    person = {'name': 'Test', 'age': 12345}
    return Response(person)




class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Używamy request.user, aby uzyskać informacje o zalogowanym użytkowniku
        user = request.user
        user1 = User.objects.filter(id=user.id).first()
        return Response({
            "id": user.id,
            "username": user1.username,
            "email": user1.email,
        })

class EventView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Używamy request.user, aby uzyskać informacje o zalogowanym użytkowniku
        try:
            print(request.data)
            alcohol = Alcohol.objects.filter(name=request.data.get('name')).first()
            if not alcohol:
                print('Creating new alcohol')
                alcohol = Alcohol.objects.create(
                    name = request.data.get('name'),
                    alcoholType= request.data.get('alcoholType'),
                    price = request.data.get('price'),
                    volume = request.data.get('volume'),
                    percentage = request.data.get('percentage'),
                    brand = request.data.get('brand')
                )
                alcohol.save()
            user = request.user
            user1 = User.objects.filter(id=user.id).first()
            event = Event.objects.create(
                userId = user1,
                eventName = request.data.get('eventName'),
                
                date = self.getDate(request.data.get("date"), request.data.get("time")) ,
                alcohol = alcohol
            )

            return Response({'message': f'{self.isTooMuch(request.user.id)}'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    
    def getDate(self, date, time, opt='s'):
        currentTime = datetime.datetime.now()
        ymd = date.split('-')
        year = int(ymd[0])
        month = int(ymd[1])
        day = int(ymd[2])
        hs = time.split(':')
        hour = int(hs[0])
        minute = int(hs[1])
        if opt == 'e': 
            return datetime.datetime(year, month, day, 23,59,59)  
        return datetime.datetime(year, month, day, hour, minute)  

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
        print(today)
        print(startDate)
        alcoholConsumption = self.totalAlcoholConsumption(userId, startDate, today )
        if alcoholConsumption[0] < 355.0: 
            return 'alcohol created successfully'
        else: 
            return 'you drink too much'
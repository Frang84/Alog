from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.db import connection
from rest_framework import status
from alcohol.models import Hangover
import datetime
import pytz





class HangoverView(APIView): 
    ermission_classes = [IsAuthenticated]
    def post(self, request): 
        try: 
            userId = request.user.id 
            user = User.objects.all().filter(id = userId).first()
            date = self.getDate(request.data.get("date")) 
            hangoverType = request.data.get('hangoverType')
            Hangover.objects.create(user=user, date=date, hangoverType=hangoverType)
            return Response({'message': 'Hangover created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return  Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request): 
        
        hangovers = self.getHangovers(request.user.id)
        hangoversList = [{'id': row[0],'date': row[1], 'hangoverType': row[2]} for row in hangovers]
        return Response({
            'hangoversList': hangoversList
        })

    def delete(self, request): 
        try: 
            # Pobierz obiekt Hangover na podstawie ID i upewnij się, że należy do zalogowanego użytkownika
            hangover = Hangover.objects.filter(id=request.data.get('hangoverId'), user_id=request.user.id).first()
            if hangover:
                hangover.delete()
                return Response({'message': 'Hangover deleted successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Hangover not found or you are not authorized to delete it'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


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





    
    def getDate(self, date, opt='s'):
        print(date)
        ymd = date.split('-')
        year = int(ymd[0])
        month = int(ymd[1])
        day = int(ymd[2])
        if opt == 'e': 
            return datetime.datetime(year, month, day, 23,59,59)  
        return datetime.datetime(year, month, day)  
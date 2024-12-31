from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import AlcoholSerializer, EventSerializer
from rest_framework import status
from .models import Alcohol, Event
import datetime



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
                date = datetime.datetime.now(),
                alcohol = alcohol
            )
            return Response({'message': 'Alcohol created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

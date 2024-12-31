from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import AlcoholSerializer, EventSerializer



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
        user = request.user
        user1 = User.objects.filter(id=user.id).first()
        serializer = AlcoholSerializer(data=request.data)
        
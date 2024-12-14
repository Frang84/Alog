from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated



@api_view(['GET'])
def getData(request): 
    person = {'name': 'Test', 'age': 12345}
    return Response(person)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Używamy request.user, aby uzyskać informacje o zalogowanym użytkowniku
        user = request.user
        return Response({
            "id": user.id,
        })
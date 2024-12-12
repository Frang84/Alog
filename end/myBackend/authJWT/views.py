from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserSerializer
from rest_framework.response import Response

# class Home(APIView):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         content = {'message': 'Hello, World!'}
#         return Response(content)

class RegisterView(APIView):
    def post(self, request):
        serilizer = UserSerializer(data=request.data)
        serilizer.is_valid(raise_exception=True)
        serilizer.save()
        return Response(serilizer.data)
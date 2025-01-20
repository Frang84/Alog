from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication

# class Home(APIView):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         content = {'message': 'Hello, World!'}
#         return Response(content)

class RegisterView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    def post(self, request):

        # Tworzenie użytkownika na podstawie danych z żądania
        
        try:
          
            user = User.objects.create(
                username = request.data.get('username'),
                email = request.data.get('email'),
                password = make_password(request.data.get('password'))  # Hasło musi być hashowane
            )
            user.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    def post(self, request):
        # Pobranie danych logowania
        email = request.data.get('email')
        password = request.data.get('password')
        
        # Wyszukanie użytkownika w bazie danych
        user = User.objects.filter(email=email).first()

        if not user:
            raise AuthenticationFailed('User not found')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')
        
        # Generowanie tokenów JWT
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Pobierz refresh token z danych żądania
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            # Dodaj token do blacklisty
            token.blacklist()
            return Response({"message": "Token successfully blacklisted"}, status=200)
        except Exception as e:
            return Response({"error": "Invalid token"}, status=400)
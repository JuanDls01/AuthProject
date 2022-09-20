from django.contrib.auth import authenticate
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.user.models import UserAccount
from apps.user.serializers import (
    UserSerializer, CustomUserSerializer, CustomTokenObtainPairSerializer)


class UserCreateAPIView(generics.CreateAPIView):
    def create(self, request):
        data = request.data
        user_serializer = UserSerializer(data=data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({
                'message': 'Usuario creado exitosamente',
            }, status.HTTP_201_CREATED)

        return Response({
            'message': 'Hay errores en el registro',
            'errors': user_serializer.errors
        }, status.HTTP_400_BAD_REQUEST)


class LoginAPIView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        user = authenticate(
            email=email,
            password=password
        )
        print(user)

        if user:
            login_serializer = self.serializer_class(data=request.data)
            if login_serializer.is_valid():
                user_serializer = CustomUserSerializer(user)
                return Response({
                    'token': login_serializer.validated_data.get('access'),
                    'refresh-token': login_serializer.validated_data.get('refresh'),
                    'user': user_serializer.data,
                    'message': 'Inicio de sesión exitosa'
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'error': 'Contraseña o nombre de usuario incorrectos'
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                'error': 'Usuario no registrado'
            }, status=status.HTTP_400_BAD_REQUEST)


class ListUsersAPIView(generics.ListAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminUser]

    def list(self, request):
        queryset = self.get_queryset()
        serializer = CustomUserSerializer(queryset, many=True)
        return Response({
            'users': serializer.data
        }, status.HTTP_200_OK)

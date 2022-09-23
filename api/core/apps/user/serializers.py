from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from apps.user.models import UserAccount


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'

    def create(self, validated_data):
        user = UserAccount(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserJWTSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['first_name', 'email', 'last_name', 'id', 'group']


class CustomUserSerializer(serializers.ModelSerializer):
    group = serializers.StringRelatedField()

    class Meta:
        model = UserAccount
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'is_superuser',
            'group',
        ]


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        # ...

        return token

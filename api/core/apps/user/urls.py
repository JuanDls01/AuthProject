from django.urls import path
from apps.user.views import (UserCreateAPIView, ListUsersAPIView, LoginAPIView)

urlpatterns = [
    path('create/', UserCreateAPIView.as_view(), name='user_create'),
    path('users/', ListUsersAPIView.as_view(), name='list_users'),
    path('login/', LoginAPIView.as_view(), name='login_user')
]

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import os
from django.contrib.auth.models import Group


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        '''Función para crear un usuario'''

        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        '''Función para crear un super usuario'''

        user = self.create_user(email, password, **extra_fields)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    group = models.ForeignKey(
        Group, blank=True, null=True, on_delete=models.SET_NULL)

    objects = UserAccountManager()

    # USERNAME_FIELD: hace referencia al parámetro que va a diferenciar al modelo de los demas y siempre va a ser requerido
    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS: campos requeridos si o si. Especialmente cuando creamos un usuario por consola.
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return self.first_name + '' + self.last_name

    def get_short_name(self):
        return self.first_name

    def get_group(self):
        return self.group

    def __str__(self):
        return f'Usuario: {self.email}'

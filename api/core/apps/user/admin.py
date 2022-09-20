from django.contrib import admin
from . import models
from django.contrib.auth import get_user_model

User = get_user_model()


class UserAdmin(admin.ModelAdmin):
    '''
    list_display: Permite editar la manera en que mostramos la información
    list_display_links: Permite hacer click en la información y poder ir a editarla
    search_fields: Permite editar los campos especificados.
    '''
    list_display = ('first_name', 'last_name', 'email',
                    'is_staff', 'is_superuser', 'is_active', 'last_login', 'group')
    list_display_links = ('first_name', 'last_name', 'email')
    search_fields = ('first_name', 'last_name', 'email',
                     'is_staff', 'is_superuser', 'is_active', 'last_login', 'group')
    list_per_page = 25


admin.site.register(User, UserAdmin)

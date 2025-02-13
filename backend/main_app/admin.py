from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django import forms
from .models import CustomUser, Profile

# Custom form for user creation in Django admin
class CustomUserCreationForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ('email', 'name', 'password1', 'password2')

# Custom form for user change in Django admin
class CustomUserChangeForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ('email', 'name', 'password', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm

    list_display = ('email', 'name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    search_fields = ('email', 'name')
    ordering = ('email',)

    # Override fieldsets to exclude username
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'is_staff', 'is_active')}
         ),
    )

    def get_fieldsets(self, request, obj=None):
        """ Override fieldsets to ensure username isn't expected. """
        return self.fieldsets

    def get_form(self, request, obj=None, **kwargs):
        """ Override get_form to prevent username-related issues. """
        kwargs['form'] = self.form if obj else self.add_form
        return super().get_form(request, obj, **kwargs)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio')
    search_fields = ('user__email', 'bio')

admin.site.register(CustomUser, CustomUserAdmin)

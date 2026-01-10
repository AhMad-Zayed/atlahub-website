from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    # 1. تخصيص الحقول التي تظهر في القائمة (الجدول الخارجي)
    list_display = ['username', 'email', 'role', 'is_staff']
    
    # 2. إضافة حقولنا الجديدة (Role, Phone) إلى صفحة التعديل
    fieldsets = UserAdmin.fieldsets + (
        ('معلومات إضافية', {'fields': ('role', 'phone_number')}),
    )

# تسجيل الموديل
admin.site.register(User, CustomUserAdmin)
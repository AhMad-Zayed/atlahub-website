from django.contrib import admin
from django.urls import path, include # 👈 تأكد أن كلمة include موجودة هنا

urlpatterns = [
    # رابط لوحة الأدمن (موجود سابقاً)
    path('admin/', admin.site.urls),

    # رابط تطبيق الرحلات (موجود سابقاً)
    path('api/trips/', include('trips.urls')),

    # 👇 هذا هو الرابط الجديد الذي يربط تطبيق الحسابات بالمشروع
    path('api/auth/', include('accounts.urls')),
]
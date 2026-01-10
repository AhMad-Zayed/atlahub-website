from django.contrib import admin


from .models import TripMaster, TripInstance  # استدعاء المودلز

# تسجيل الجداول لتظهر في الأدمن
admin.site.register(TripMaster)
admin.site.register(TripInstance)

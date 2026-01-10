from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # تعريف الأدوار الوظيفية (Roles) بناءً على وثيقة المشروع
    ROLE_CHOICES = (
        ('SA', 'Super Admin'),        # المدير العام (صلاحيات كاملة)
        ('OM', 'Operations Manager'), # مدير العمليات (بناء الرحلات والمخزون)
        ('BA', 'Booking Agent'),      # موظف الحجز (حجز واستلام مال فقط)
        ('ACC', 'Accountant'),        # المحاسب (التدقيق والتقارير المالية)
        ('TG', 'Tour Guide'),         # دليل سياحي (للمستقبل: تطبيق الموبايل)
        ('CUST', 'Customer'),         # العميل (للحجز من الموقع)
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='CUST', verbose_name='الدور الوظيفي')
    phone_number = models.CharField(max_length=20, blank=True, null=True, verbose_name='رقم الهاتف')

    # يمكنك إضافة حقول أخرى هنا مستقبلاً (مثل صورة البروفايل، العنوان...)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
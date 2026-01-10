from django.db import models
from django.utils import timezone
import random
import string


# =========================
# Helper Functions
# =========================

def generate_booking_ref():
    """ دالة لإنشاء رقم حجز عشوائي مثل: ZT-A9F3K2 """
    return 'ZT-' + ''.join(
        random.choices(string.ascii_uppercase + string.digits, k=6)
    )


# =========================
# Trip Master
# =========================

class TripMaster(models.Model):
    """ قالب الرحلة (Master) - المعلومات الثابتة """

    title = models.CharField(
        max_length=200,
        verbose_name="اسم الرحلة"
    )
    description = models.TextField(
        verbose_name="وصف البرنامج"
    )
    image = models.ImageField(
        upload_to='trips/',
        verbose_name="صورة الرحلة"
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title


# =========================
# Trip Instance
# =========================

class TripInstance(models.Model):

    STATUS_CHOICES = [
        ('active', 'نشطة'),
        ('completed', 'منتهية/مؤرشفة'),
        ('full', 'ممتلئة'),
    ]

    TRIP_KIND_CHOICES = [
        ('overnight', 'رحلة مبيت (فنادق)'),
        ('daytrip', 'رحلة يوم واحد (بدون مبيت)'),
    ]

    master = models.ForeignKey(
        TripMaster,
        on_delete=models.CASCADE,
        related_name='instances'
    )

    trip_kind = models.CharField(
        max_length=20,
        choices=TRIP_KIND_CHOICES,
        default='overnight',
        verbose_name="نوع الرحلة"
    )

    start_date = models.DateField(
        verbose_name="تاريخ الانطلاق"
    )
    end_date = models.DateField(
        verbose_name="تاريخ العودة"
    )

    # -------- الأسعار --------

    price_double = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="سعر البالغ / الغرفة المزدوجة"
    )

    price_single = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="سعر الغرفة المفردة",
        blank=True,
        null=True
    )

    price_triple = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="سعر الشخص الثالث",
        blank=True,
        null=True
    )

    price_child_small = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="سعر الطفل (0-6)",
        blank=True,
        null=True
    )

    price_child_large = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="سعر الطفل (6-12)",
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='active'
    )

    @property
    def is_archived(self):
        return self.end_date < timezone.now().date()

    @property
    def is_day_trip(self):
        return self.trip_kind == 'daytrip'

    def __str__(self):
        return f"{self.master.title} - {self.start_date} ({self.get_trip_kind_display()})"


# =========================
# Booking
# =========================

class Booking(models.Model):
    """ نموذج الحجز """

    trip = models.ForeignKey(
        TripInstance,
        on_delete=models.CASCADE,
        related_name='bookings'
    )

    booking_ref = models.CharField(
        max_length=10,
        default=generate_booking_ref,
        unique=True,
        verbose_name="رقم الحجز"
    )

    customer_name = models.CharField(
        max_length=100,
        verbose_name="اسم العميل"
    )
    phone_number = models.CharField(
        max_length=20,
        verbose_name="رقم الهاتف"
    )

    adults_double = models.PositiveIntegerField(
        default=0,
        verbose_name="عدد (مزدوج/بالغ)"
    )
    adults_single = models.PositiveIntegerField(
        default=0,
        verbose_name="عدد (مفرد)"
    )
    children_small = models.PositiveIntegerField(
        default=0,
        verbose_name="أطفال (0-6)"
    )
    children_large = models.PositiveIntegerField(
        default=0,
        verbose_name="أطفال (6-12)"
    )

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="الإجمالي"
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="وقت الحجز"
    )

    def __str__(self):
        return f"{self.customer_name} - {self.booking_ref}"

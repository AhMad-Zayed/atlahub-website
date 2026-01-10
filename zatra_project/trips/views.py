from django.shortcuts import render
from rest_framework import generics
from .models import TripInstance,Booking
from django.core.mail import send_mail
from django.conf import settings
# السطر التالي هو المهم، تأكد من وجود كلمة .serializers
from .serializers import TripInstanceSerializer,BookingSerializer 

class TripListView(generics.ListAPIView):
    queryset = TripInstance.objects.all().order_by('-start_date')
    serializer_class = TripInstanceSerializer

class BookingCreateView(generics.ListCreateAPIView):
    """ View مخصص فقط لإنشاء حجوزات جديدة """
    queryset = Booking.objects.all().order_by('-created_at') # ترتيب من الأحدث للأقدم
    serializer_class = BookingSerializer
    # هذه الدالة تعمل تلقائياً بعد نجاح الحجز
    def perform_create(self, serializer):
        # 1. حفظ الحجز أولاً
        booking = serializer.save()
        
        # 2. تجهيز رسالة العميل
        subject_client = f"تأكيد حجز رحلة: {booking.booking_ref}"
        message_client = f"""
        مرحباً {booking.customer_name}،
        
        شكراً لاختيارك زطرة للسياحة! 🎉
        تم استلام طلب حجزك بنجاح.
        
        تفاصيل الحجز:
        - رقم المرجع: {booking.booking_ref}
        - الرحلة: {booking.trip.master.title}
        - المبلغ الإجمالي: ${booking.total_price}
        
        سيقوم فريقنا بالتواصل معك قريباً لتأكيد الدفع.
        
        مع تحيات،
        فريق زطرة للسياحة
        """
        
        # 3. تجهيز رسالة الإدارة (لك أنت)
        subject_admin = f"🔔 حجز جديد: {booking.booking_ref}"
        message_admin = f"""
        لديك حجز جديد!
        
        العميل: {booking.customer_name}
        الهاتف: {booking.phone_number}
        الرحلة: {booking.trip.master.title}
        المبلغ: ${booking.total_price}
        """

        try:
            # إرسال للعميل
            send_mail(
                subject_client,
                message_client,
                'noreply@zatra.com', # من
                ['customer@example.com'], # إلى (في الواقع نضع booking.email)
                fail_silently=True,
            )

            # إرسال للإدارة
            send_mail(
                subject_admin,
                message_admin,
                'system@zatra.com',
                ['admin@zatra.com'], # ضع إيميلك الحقيقي هنا لاحقاً
                fail_silently=True,
            )
            print("✅ Email sent successfully to Console")
        except Exception as e:
            print(f"❌ Error sending email: {e}") 

class TripDetailView(generics.RetrieveAPIView):
    """ View لجلب تفاصيل رحلة واحدة فقط عن طريق ID """
    queryset = TripInstance.objects.all()
    serializer_class = TripInstanceSerializer
    lookup_field = 'id'
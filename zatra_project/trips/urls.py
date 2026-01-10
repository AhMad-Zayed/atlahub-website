from django.urls import path
from .views import TripListView, BookingCreateView, TripDetailView

urlpatterns = [
    path('trips/', TripListView.as_view(), name='trip-list'), # رابط الرحلات
    path('bookings/', BookingCreateView.as_view(), name='booking-create'), # الرابط الجديد للحجز
    path('trips/<int:id>/', TripDetailView.as_view(), name='trip-detail'),
    
    path('bookings/', BookingCreateView.as_view(), name='booking-create'),
]
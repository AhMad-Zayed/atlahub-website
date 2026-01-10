from rest_framework import serializers
# تأكد من استيراد Booking هنا 👇
from .models import TripMaster, TripInstance, Booking 

class TripMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripMaster
        fields = ['title', 'description', 'image']

class TripInstanceSerializer(serializers.ModelSerializer):
    master = TripMasterSerializer()
    is_archived = serializers.ReadOnlyField()
    is_full = serializers.SerializerMethodField()
    is_day_trip = serializers.ReadOnlyField()

    class Meta:
        model = TripInstance
        fields = [
            'id', 'master', 'start_date', 'end_date', 'status', 'trip_kind',
            'price_double', 'price_single', 'price_triple', 
            'price_child_small', 'price_child_large',
            'is_archived', 'is_full', 'is_day_trip'
        ]

    def get_is_full(self, obj):
        return obj.status == 'full'

# --- هذا هو الكلاس الناقص عندك 👇 ---
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            'id', 'booking_ref', 'customer_name', 'phone_number', 'trip', 'total_price', 'created_at'
        ]
        read_only_fields = ['booking_ref']
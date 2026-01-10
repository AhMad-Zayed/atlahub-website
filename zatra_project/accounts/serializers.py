from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # إضافة معلومات إضافية داخل التوكن المشفر (اختياري)
        token['role'] = user.role
        token['username'] = user.username

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # إضافة معلومات للرد الظاهر (JSON Response)
        # هذا ما سيستلمه الفرونت اند فوراً
        data['role'] = self.user.role
        data['username'] = self.user.username
        data['full_name'] = f"{self.user.first_name} {self.user.last_name}"
        
        return data
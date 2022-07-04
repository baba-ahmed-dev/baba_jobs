from rest_framework import serializers
from .models import User , Company , Profile


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())
    class Meta:
        model = Profile
        fields = '__all__'
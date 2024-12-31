from rest_framework import serializers
from .models import Event, Alcohol

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class AlcoholSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alcohol
        fields = '__all__'
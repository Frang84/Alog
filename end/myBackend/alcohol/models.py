from django.db import models
from django.contrib.auth.models import User
class Alcohol(models.Model):
    name = models.CharField(max_length=200)
    alcoholType = models.CharField(max_length=100)
    price = models.FloatField()
    volume = models.FloatField()
    percentage = models.FloatField()
    brand = models.CharField(max_length=100)

    def __str__(self):
        return self.name



class Event(models.Model):
    userId = models.ForeignKey(User, related_name='events', on_delete=models.CASCADE, default=1)
    eventName = models.CharField(max_length=100)
    date = models.DateField()
    alcohol = models.ForeignKey(Alcohol, related_name='events', on_delete=models.CASCADE)
    def __str__(self):
        return self.name
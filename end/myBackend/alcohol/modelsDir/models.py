from django.db import models
from django.contrib.auth.models import User


class Alcohol(models.Model):
    alcoholTypeChoices = [
        ('Wine', 'Wine'),
        ('Beer', 'Beer'),
        ('Vodka', 'Vodka'),
        ('Whiskey', 'Whiskey'),
        ('Liqueur', 'Liqueur'),
        ('Cider', 'Cider'),
        ('Rum', 'Rum'),
        ('Gin', 'Gin'),
        ('Brandy', 'Brandy'),
        ('Tequila', 'Tequila'),
        ('Cognac', 'Cognac'),
        ('Other', 'Other')
    ]
    name = models.CharField(max_length=200)
    alcoholType = models.CharField(max_length=100, choices=alcoholTypeChoices)
    price = models.FloatField()
    volume = models.FloatField()
    percentage = models.FloatField()
    brand = models.CharField(max_length=100)

    def __str__(self):
        return self.name



class Event(models.Model):
    eventNameChoices = [
        ('Birthday', 'Birthday'),
        ('Wedding', 'Wedding'),
        ('Party', 'Party'),
        ('Meeting with friend', 'Meeting with friend'),
        ('Work meeting', 'Work meeting'),
        ('Date', 'Date'),
        ('Alone', 'Alone'),
        ('Other', 'Other')
    ]
    userId = models.ForeignKey(User, related_name='events', on_delete=models.CASCADE, default=1)
    eventName = models.CharField(max_length=100, choices=eventNameChoices)
    date = models.DateTimeField()
    alcohol = models.ForeignKey(Alcohol, related_name='events', on_delete=models.CASCADE)
    def __str__(self):
        return self.name


class Challange(models.Model): 
    challangeTypeChoice = [
        ('Limit', 'Limit'),
        ('Alone', 'Alone')
    ]
    user = models.ForeignKey(User, related_name='chellenges', on_delete=models.CASCADE)
    limitAlc = models.FloatField()
    chellangeType = models.CharField(max_length=100, choices=challangeTypeChoice)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()

class Hangover(models.Model): 
    hangoverTypeChoice = [
        ('restless night', 'restless night'),
        ('bad mood', 'bad mood'),
        ('indigestion', 'indigestion')
    ]
    user = models.ForeignKey(User, related_name='hangovers', on_delete=models.CASCADE)
    date = models.DateTimeField()
    hangoverType = models.CharField(max_length=100, choices=hangoverTypeChoice)
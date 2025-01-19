from django.contrib import admin
from .modelsDir.models import Event, Alcohol, Challange

admin.site.register(Event)
admin.site.register(Alcohol)
admin.site.register(Challange)
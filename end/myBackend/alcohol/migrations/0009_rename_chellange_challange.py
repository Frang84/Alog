# Generated by Django 5.1.4 on 2025-01-07 23:19

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('alcohol', '0008_chellange'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Chellange',
            new_name='Challange',
        ),
    ]

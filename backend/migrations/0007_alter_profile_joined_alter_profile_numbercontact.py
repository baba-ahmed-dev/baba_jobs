# Generated by Django 4.0.4 on 2022-06-10 04:59

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_profile_birthcountry_profile_datebirth_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='joined',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='profile',
            name='numbercontact',
            field=models.BigIntegerField(blank=True, null=True),
        ),
    ]
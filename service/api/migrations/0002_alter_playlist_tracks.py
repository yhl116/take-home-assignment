# Generated by Django 3.2.12 on 2022-02-19 06:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playlist',
            name='tracks',
            field=models.ManyToManyField(blank=True, default=[], to='api.Track'),
        ),
    ]

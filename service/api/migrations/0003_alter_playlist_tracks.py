# Generated by Django 3.2.12 on 2022-02-19 06:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_playlist_tracks'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playlist',
            name='tracks',
            field=models.ManyToManyField(blank=True, default=[], null=True, to='api.Track'),
        ),
    ]
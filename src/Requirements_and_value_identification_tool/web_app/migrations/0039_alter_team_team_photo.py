# Generated by Django 4.2.5 on 2024-01-14 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_app', '0038_alter_team_team_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='team_photo',
            field=models.ImageField(upload_to=''),
        ),
    ]
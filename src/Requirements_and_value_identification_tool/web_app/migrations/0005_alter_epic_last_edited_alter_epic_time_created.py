# Generated by Django 4.2.5 on 2023-10-05 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_app', '0004_alter_epic_last_edited_alter_epic_time_created_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='epic',
            name='last_edited',
            field=models.CharField(max_length=128),
        ),
        migrations.AlterField(
            model_name='epic',
            name='time_created',
            field=models.CharField(max_length=128),
        ),
    ]

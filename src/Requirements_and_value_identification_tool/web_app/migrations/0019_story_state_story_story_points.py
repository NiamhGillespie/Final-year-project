# Generated by Django 4.2.5 on 2023-11-02 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_app', '0018_alter_valuetag_sub_values'),
    ]

    operations = [
        migrations.AddField(
            model_name='story',
            name='state',
            field=models.CharField(default='backlog', max_length=128),
        ),
        migrations.AddField(
            model_name='story',
            name='story_points',
            field=models.CharField(default='N/A', max_length=10),
        ),
    ]
# Generated by Django 4.2.5 on 2023-11-30 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_app', '0026_trackingcolumn_story_list_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='trackingcolumn',
            name='WIP',
            field=models.IntegerField(blank=True, default=3),
            preserve_default=False,
        ),
    ]

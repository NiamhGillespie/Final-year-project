# Generated by Django 4.2.5 on 2023-11-29 13:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_app', '0022_alter_story_state_remove_trackingcolumn_stories_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trackingcolumn',
            name='stories',
        ),
        migrations.AddField(
            model_name='trackingcolumn',
            name='stories',
            field=models.ManyToManyField(blank=True, default=[], to='web_app.story'),
        ),
    ]

# Generated by Django 4.2.5 on 2023-11-19 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_app', '0020_trackingcolumn_alter_tag_description_alter_tag_title_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='trackingcolumn',
            name='stories',
            field=models.ManyToManyField(blank=True, default=[], to='web_app.story'),
        ),
    ]

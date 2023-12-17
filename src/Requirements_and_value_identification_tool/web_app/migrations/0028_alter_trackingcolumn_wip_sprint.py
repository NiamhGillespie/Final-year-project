# Generated by Django 4.2.5 on 2023-12-06 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_app', '0027_trackingcolumn_wip'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trackingcolumn',
            name='WIP',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.CreateModel(
            name='Sprint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sprint_id', models.CharField(default='error', max_length=8)),
                ('dashboard_id', models.CharField(default='error', max_length=8)),
                ('start_date', models.CharField(default='error', max_length=8)),
                ('end_date', models.CharField(default='error', max_length=8)),
                ('story_list', models.CharField(blank=True, max_length=128)),
                ('stories', models.ManyToManyField(blank=True, default=[], to='web_app.story')),
            ],
        ),
    ]
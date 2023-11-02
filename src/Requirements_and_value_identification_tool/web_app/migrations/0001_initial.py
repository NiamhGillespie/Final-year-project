# Generated by Django 4.2.5 on 2023-10-02 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Epic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('epic_id', models.CharField(max_length=8)),
                ('dashboard_id', models.CharField(max_length=8)),
                ('title', models.CharField(max_length=128)),
                ('last_edited_by', models.CharField(max_length=128)),
                ('last_edited', models.DateTimeField()),
                ('created_by', models.CharField(max_length=128)),
                ('time_created', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Story',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('story_id', models.CharField(max_length=8)),
                ('epic_id', models.CharField(max_length=8)),
                ('title', models.CharField(max_length=128)),
                ('user_story', models.CharField(max_length=1028)),
                ('definition_of_done', models.CharField(max_length=1028)),
                ('values', models.CharField(max_length=1028)),
                ('priority', models.CharField(choices=[('LOW', 'low priority'), ('MEDIUM', 'medium priority'), ('HIGH', 'high priority')], max_length=6)),
                ('pairable', models.BooleanField()),
                ('assigned_to', models.CharField(max_length=128)),
                ('last_edited_by', models.CharField(max_length=128)),
                ('last_edited', models.DateTimeField()),
                ('created_by', models.CharField(max_length=128)),
                ('time_created', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task_id', models.CharField(max_length=8)),
                ('story_id', models.CharField(max_length=8)),
                ('title', models.CharField(max_length=128)),
                ('description', models.CharField(max_length=1028)),
                ('priority', models.CharField(choices=[('LOW', 'low priority'), ('MEDIUM', 'medium priority'), ('HIGH', 'high priority')], max_length=6)),
                ('pairable', models.BooleanField()),
                ('assigned_to', models.CharField(max_length=128)),
                ('last_edited_by', models.CharField(max_length=128)),
                ('last_edited', models.DateTimeField()),
                ('created_by', models.CharField(max_length=128)),
                ('time_created', models.DateTimeField()),
            ],
        ),
    ]

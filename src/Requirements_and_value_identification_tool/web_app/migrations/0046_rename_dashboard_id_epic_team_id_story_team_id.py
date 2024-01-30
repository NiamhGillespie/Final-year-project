# Generated by Django 4.2.5 on 2024-01-24 01:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_app', '0045_rename_user_userprofile'),
    ]

    operations = [
        migrations.RenameField(
            model_name='epic',
            old_name='dashboard_id',
            new_name='team_id',
        ),
        migrations.AddField(
            model_name='story',
            name='team_id',
            field=models.CharField(default=1, max_length=8),
            preserve_default=False,
        ),
    ]
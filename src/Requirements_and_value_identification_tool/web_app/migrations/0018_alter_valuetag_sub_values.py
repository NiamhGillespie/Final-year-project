# Generated by Django 4.2.5 on 2023-11-02 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_app', '0017_alter_epic_tags_alter_story_tags_remove_story_values_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='valuetag',
            name='sub_values',
            field=models.ManyToManyField(blank=True, default='error', to='web_app.valuetag'),
        ),
    ]

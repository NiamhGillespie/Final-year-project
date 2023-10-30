# Generated by Django 4.2.5 on 2023-10-30 21:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_app', '0013_alter_epic_order_alter_story_order'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=16)),
                ('description', models.CharField(max_length=128)),
                ('colour', models.CharField(max_length=6)),
            ],
        ),
        migrations.AddField(
            model_name='epic',
            name='tags',
            field=models.ManyToManyField(to='web_app.tag'),
        ),
        migrations.AddField(
            model_name='story',
            name='tags',
            field=models.ManyToManyField(to='web_app.tag'),
        ),
    ]

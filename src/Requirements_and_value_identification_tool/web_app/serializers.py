from rest_framework import serializers
from .models import *

class EpicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Epic
        fields = ('epic_id', 'dashboard_id', 'title', 'last_edited_by', 'last_edited', 'created_by', 'time_created')

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ('story_id', 'epic_id', 'title', 'user_story', 'definition_of_done', 'value_statement', 'priority', 'pairable', 'assigned_to',
                  'last_edited_by', 'last_edited', 'created_by', 'time_created')

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('task_id', 'story_id', 'title', 'description', 'priority', 'pairable', 'assigned_to',
                  'last_edited_by', 'last_edited', 'created_by', 'time_created')
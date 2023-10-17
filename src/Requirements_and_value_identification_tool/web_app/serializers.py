from rest_framework import serializers
from .models import *

class EpicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Epic
        fields = ('id', 'epic_id', 'epic_colour', 'dashboard_id', 'title', 'last_edited_by', 'last_edited', 'created_by', 'time_created')

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ('id', 'story_id', 'epic_id', 'title', 'order', 'user_story', 'definition_of_done', 'value_statement', 'priority', 'pairable', 'assigned_to',
                  'last_edited_by', 'last_edited', 'created_by', 'time_created')
        
        @property 
        def order(self, obj):
            print("?")
            return Story.objects.count()

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('task_id', 'story_id', 'title', 'description', 'priority', 'pairable', 'assigned_to',
                  'last_edited_by', 'last_edited', 'created_by', 'time_created')
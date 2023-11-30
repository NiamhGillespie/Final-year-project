from rest_framework import serializers
from .models import *

class EpicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Epic
        fields = ('id', 'epic_id', 'epic_colour', 'dashboard_id', 'title', 'order', 'tags', 'values', 'last_edited_by', 'last_edited', 'created_by', 'time_created')

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ('id', 'story_id', 'epic_id', 'title', 'order', 'tags', 'user_story', 'definition_of_done', 'values', 'story_points', 'priority', 
                  'pairable', 'assigned_to', 'state', 'last_edited_by', 'last_edited', 'created_by', 'time_created')
        
        @property 
        def order(self, obj):
            print("?")
            return Story.objects.count()

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('task_id', 'story_id', 'title', 'description', 'priority', 'pairable', 'assigned_to',
                  'last_edited_by', 'last_edited', 'created_by', 'time_created')
        
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'tag_id', 'team_id', 'title', 'description', 'colour')

class ValueTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ValueTag
        fields = ('id', 'tag_id', 'team_id', 'title', 'description', 'sub_values', 'colour')

class TrackingColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackingColumn
        fields = ('id', 'column_id', 'dashboard_id', 'team_id', 'title', 'mark_as_complete', 'stories', 'story_list', 'WIP')

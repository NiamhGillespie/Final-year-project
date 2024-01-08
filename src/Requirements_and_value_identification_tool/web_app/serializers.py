from rest_framework import serializers
from .models import *

class EpicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Epic
        fields = ('id', 'epic_id', 'epic_colour', 'dashboard_id', 'title', 'order', 'tags', 'values',
                  'last_edited_by', 'last_edited', 'created_by', 'time_created', 'completed')

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ('id', 'story_id', 'epic_id', 'title', 'order', 'tags', 'user_story', 'definition_of_done', 'values', 'story_points', 'priority', 
                  'pairable', 'assigned_to', 'state', 'completed', 'last_edited_by', 'last_edited', 'created_by', 'time_created')
        
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

class SprintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sprint
        fields = ('id', 'sprint_id', 'dashboard_id', 'start_date', 'end_date', 'stories', 'story_list')

class OrganisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organisation
        fields = ('id', 'name', 'teams', 'users')

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('id', 'name', 'picture', 'team_members')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'belongs_to', 'username', 'first_name', 'surname', 'role', 'teams')
from rest_framework import serializers
from .models import *

class EpicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Epic
        fields = ('id', 'epic_id', 'epic_colour', 'team_id', 'title', 'order', 'tags', 'values',
                  'last_edited_by', 'last_edited', 'created_by', 'time_created', 'completed')

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ('id', 'story_id', 'epic_id', 'team_id', 'title', 'order', 'tags', 'user_story', 'definition_of_done', 'values', 'story_points', 'priority', 
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

class OrganisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organisation
        fields = ('id', 'name', 'teams', 'users')

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('id', 'belongs_to', 'team_name', 'team_photo', 'team_leads', 'team_members')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'belongs_to', 'username', 'password', 'email', 'first_name', 'surname', 'role', 'teams', 'profile_photo')

class UsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = (['username'])
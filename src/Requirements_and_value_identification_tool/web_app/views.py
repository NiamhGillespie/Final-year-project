from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django import db
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

import time

from .models import Epic, Story, Tag, ValueTag
from .serializers import *


@api_view(['GET', 'POST'])
def EpicDashboardInfo(request, team_id):
    if request.method == 'GET':
        epic_data =  Epic.objects.filter(team_id = team_id).order_by('order')
        epic_serializer = EpicSerializer(epic_data, context={'request': request}, many=True)

        story_data =  Story.objects.filter(team_id = team_id).order_by('order')
        story_serializer = StorySerializer(story_data, context={'request': request}, many=True)

        epic_and_story_data = [epic_serializer.data, story_serializer.data]

        return Response(epic_and_story_data)
    
    if request.method == 'POST':
        
        if (request.data.get('epic_colour')):
            epic_serializer = EpicSerializer(data=request.data)
            
            if epic_serializer.is_valid():
                epic_serializer.save()
                epic_id = epic_serializer.data['id']
                team_id = epic_serializer.data['team_id']

                epics = Epic.objects.filter(team_id=team_id).order_by('order')
                epic_serializer_2 = EpicSerializer(epics, many=True)

                if len(epic_serializer_2.data) == 1:
                    order = 1
                else:
                    order = epics[len(epic_serializer_2.data) -1].order + 1
                
                Epic.objects.filter(id=epic_id).update(epic_id = epic_id)
                Epic.objects.filter(id=epic_id).update(order = order)
            

                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(epic_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if (request.data.get('story_id')):
            story_serializer = StorySerializer(data=request.data)
            
            if story_serializer.is_valid():
                story_serializer.save()
                story_id = story_serializer.data['id']
                epic_id = story_serializer.data['epic_id']

                stories = Story.objects.filter(epic_id=epic_id).order_by('order')
                story_serializer_2 = StorySerializer(stories, many=True)

                if len(story_serializer_2.data) == 1:
                    order = 1
                else:
                    order = stories[len(story_serializer_2.data) -1].order + 1
                
                Story.objects.filter(id=story_id).update(story_id = story_id)
                Story.objects.filter(id=story_id).update(order = order)

                return Response(status=status.HTTP_201_CREATED)
            else: 
                print(story_serializer.errors)
                return Response(story_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT', 'DELETE', 'GET'])
def EpicDetails(request, epic_id):
    try:
        epic = Epic.objects.get(id=epic_id)
    except Epic.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        epic_serializer = EpicSerializer(epic, data=request.data,context={'request': request})
        if epic_serializer.is_valid():
            epic_serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(epic_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        stories_to_delete = Story.objects.filter(epic_id = epic.id)
        for story in stories_to_delete:
            story.delete()
        epic.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    
    elif request.method == 'GET':
        epic_serializer = EpicSerializer(epic)
        return Response(epic_serializer.data, status=status.HTTP_200_OK)
    
@api_view(['PUT', 'DELETE', 'GET'])
def StoryDetails(request, story_id):
    try:
        story = Story.objects.get(story_id=story_id)
    except Story.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        story_serializer = StorySerializer(story, data=request.data,context={'request': request})
        if story_serializer.is_valid():
            story_serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(story_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        story.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        story_serializer = StorySerializer(story)
        return Response(story_serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def TeamTags(request, team_id):
    if request.method == 'GET':
        tags = Tag.objects.filter(team_id=team_id)
        
        tag_serializer = TagSerializer(tags, context={'request': request}, many=True)
        return Response(tag_serializer.data, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        tag_serializer = TagSerializer(data=request.data)
            
        if tag_serializer.is_valid():
            tag_serializer.save()
            tag_id = tag_serializer.data['id']
                
            Tag.objects.filter(id=tag_id).update(tag_id = tag_id)
            
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(tag_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT', 'DELETE', 'GET'])
def TagDetail(request, tag_id):
    try:
        tag = Tag.objects.get(id = tag_id)

    except Tag.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        tag_serializer = TagSerializer(tag, data=request.data,context={'request': request})
        if tag_serializer.is_valid():
            tag_serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(tag_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        tag.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        tag_serializer = TagSerializer(tag)

        return Response(tag_serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET', 'POST'])
def TeamValues(request, team_id):
    if request.method == 'GET':
        values = ValueTag.objects.filter(team_id=team_id)
        value_serializer = ValueTagSerializer(values, context={'request': request}, many=True)
        return Response(value_serializer.data, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        value_serializer = ValueTagSerializer(data=request.data)
            
        if value_serializer.is_valid():
            value_serializer.save()
            tag_id = value_serializer.data['id']
                
            ValueTag.objects.filter(id=tag_id).update(tag_id = tag_id)
            
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(value_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT', 'DELETE', 'GET'])
def ValueDetail(request, value_id):
    try:
        value = ValueTag.objects.get(id = value_id)
    except ValueTag.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        value_serializer = ValueTagSerializer(value, data=request.data,context={'request': request})
        if value_serializer.is_valid():
            value_serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(value_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        value.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        value_serializer = ValueTagSerializer(value)
        return Response(value_serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET', 'POST'])
def TeamTrackingColumns(request, team_id):
    if request.method == 'GET':
        columns = TrackingColumn.objects.filter(team_id = team_id) #could be teams or dashboard - decide later
        column_serializer = TrackingColumnSerializer(columns, context={'request': request}, many=True)
        return Response(column_serializer.data, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        column_serializer = TrackingColumnSerializer(data=request.data)
            
        if column_serializer.is_valid():
            column_serializer.save()
            column_id = column_serializer.data['id']
                
            TrackingColumn.objects.filter(id=column_id).update(column_id = column_id)
            
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(column_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT', 'DELETE', 'GET'])
def ColumnDetail(request, column_id):
    try:
        column = TrackingColumn.objects.get(id = column_id) #chnge this when implementing teams
    except TrackingColumn.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        column_serializer = TrackingColumnSerializer(column, data=request.data,context={'request': request})
        if column_serializer.is_valid():      
            column_serializer.save()
            return Response(status=status.HTTP_201_CREATED)
      
        return Response(column_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        column.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        column_serializer = TrackingColumnSerializer(column)
        try:
            return Response(column_serializer.data, status=status.HTTP_200_OK)
        finally:
                db.connections.close_all()

@api_view(['GET', 'POST'])
def TeamSprints(request):
    if request.method == 'GET':

        sprints = Sprint.objects.filter(dashboard_id='0000') #could be teams or dashboard - decide later
        sprint_serializer = SprintSerializer(sprints, context={'request': request}, many=True)
        return Response(sprint_serializer.data, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        sprint_serializer = SprintSerializer(data=request.data)
        
        if sprint_serializer.is_valid():
            sprint_serializer.save()
            sprint_id = sprint_serializer.data['id']
                
            Sprint.objects.filter(id=sprint_id).update(sprint_id = sprint_id)
            
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(sprint_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['PUT', 'DELETE', 'GET'])
def SprintDetails(request, sprint_id):
    try:
        sprint = Sprint.objects.get(id = sprint_id)
    
    except Sprint.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        sprint_serializer = SprintSerializer(sprint, data=request.data,context={'request': request})
        if sprint_serializer.is_valid():      
            sprint_serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(sprint_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        sprint.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        sprint_serializer = SprintSerializer(sprint)
        return Response(sprint_serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getCurrentTeamSprint(request):
    if request.method == 'GET':
        sprints = Sprint.objects.filter(dashboard_id='0000') #could be teams or dashboard - decide later

        current_found = False
        for sprint in sprints:
            if sprint.is_current():
                sprint_serializer = SprintSerializer(sprints, context={'request': request}, many=True)
                current_found = True
                return Response(sprint_serializer.data, status=status.HTTP_200_OK)
        
        if current_found == False:
            return Response({}, status=status.HTTP_200_OK)

@api_view(['POST', 'GET'])
def Organisations(request):
    if request.method == 'POST':
        org_serializer = OrganisationSerializer(data=request.data)
        if org_serializer.is_valid():
            org_serializer.save()
            return Response(org_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(org_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    if request.method == 'GET':
        org_data= Organisation.objects.all()
        org_serializer = OrganisationSerializer(org_data, context={'request': request}, many=True)
        return Response(org_serializer.data, status=status.HTTP_200_OK)

@api_view(['POST', 'GET'])
def Users(request, organisation_id):
    if request.method == 'POST':
        organisation = Organisation.objects.get(id=organisation_id)

        user_serializer = UserSerializer(data=request.data)

        if user_serializer.is_valid():
            user_serializer.save()

            User.objects.create_user(username=request.data['username'],
                                 email=request.data['email'],
                                 password=request.data['password'])
            

            user_id = user_serializer.data['id']
            
            new_user = UserProfile.objects.get(id=user_id)
            organisation.users.add(new_user.id)

            for team_id in user_serializer.data['teams']:
                team = Team.objects.get(id = int(team_id))
                if (user_serializer.data['role'] == 'team_lead'):
                    team.team_leads.add(user_serializer.data['id'])
                if (user_serializer.data['role'] == 'team_member'):
                    team.team_members.add(user_serializer.data['id'])

            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    if request.method == 'GET':
        user_data= UserProfile.objects.filter(belongs_to = organisation_id)
        user_serializer = UserSerializer(user_data, context={'request': request}, many=True)
        return Response(user_serializer.data, status=status.HTTP_200_OK)
    
@api_view(['POST', 'GET'])
def Teams(request, organisation_id):
    if request.method == 'POST':
        team_serializer = TeamSerializer(data=request.data)

        
        if team_serializer.is_valid():
            team_serializer.save()

            for lead_id in team_serializer.data['team_leads']:
                lead = UserProfile.objects.get(id = int(lead_id))
                lead.teams.add(team_serializer.data['id'])

            for member_id in team_serializer.data['team_members']:
                member = UserProfile.objects.get(id = int(member_id))
                member.teams.add(team_serializer.data['id'])

            
            return Response(team_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(team_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    if request.method == 'GET':
        team_data= Team.objects.filter(belongs_to = organisation_id)
        team_serializer = TeamSerializer(team_data, context={'request': request}, many=True)
        return Response(team_serializer.data, status=status.HTTP_200_OK)
    
@api_view(['PUT', 'DELETE', 'GET'])
def UserDetails(request, user_id):
    try:
        user = UserProfile.objects.get(id = int(user_id))
        
    
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        user_serializer = UserSerializer(user, data=request.data,context={'request': request})
        old_user_serializer = UserSerializer(user)
        old_team_members = old_user_serializer.data['teams']
        if user_serializer.is_valid():      
            user_serializer.save()

            userToken = User.objects.get(username=user_serializer.data['username'])
            userToken.email=request.data['email'],
            userToken.set_password(request.data['password'])

            for team_id in user_serializer.data['teams']:
                team = Team.objects.get(id = int(team_id))
                if (user_serializer.data['role'] == 'team_lead'):
                    team.team_leads.add(user_serializer.data['id'])
                    print(team)
                else:
                    team.team_members.add(user_serializer.data['id'])
                    print(team)

            for team_id in old_team_members:
                if (user_serializer.data['role'] == 'team_lead'):
                    if team_id not in user_serializer.data['teams']:
                        team = Team.objects.get(id = int(team_id))
                        team.team_leads.remove(user_serializer.data['id'])
                else:
                    if team_id not in user_serializer.data['teams']:
                        team = Team.objects.get(id = int(team_id))
                        team.team_members.remove(user_serializer.data['id'])

            userToken.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        
    
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        user_serializer = UserSerializer(user)
        return Response(user_serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT', 'DELETE', 'GET'])
def UserDetailsByUsername(request, username):
    try:
        user = UserProfile.objects.get(username = username)
        print("user", user)
    
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        user_serializer = UserSerializer(user, data=request.data,context={'request': request})
        if user_serializer.is_valid():      
            user_serializer.save()

            userToken = User.objects.get(username=user_serializer.data['username'])
            userToken.email=request.data['email'],
            userToken.set_password(request.data['password'])
            userToken.save()
            return Response(status=status.HTTP_201_CREATED)
        
        print(user_serializer.errors)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        user_serializer = UserSerializer(user)
        print(user_serializer.data)
        return Response(user_serializer.data, status=status.HTTP_200_OK)
    
@api_view(['PUT', 'DELETE', 'GET'])
def TeamDetails(request, team_id):
    try:
        team = Team.objects.get(id = int(team_id))
        print("teams", team)
    
    except Team.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        team_serializer = TeamSerializer(team, data=request.data,context={'request': request})
        old_team_serializer = TeamSerializer(team)
        old_team_leads = old_team_serializer.data['team_leads']
        old_team_members = old_team_serializer.data['team_members']
        if team_serializer.is_valid():   
            team_serializer.save()

            for lead_id in team_serializer.data['team_leads']:
                lead = UserProfile.objects.get(id = int(lead_id))
                lead.teams.add(team_serializer.data['id'])

            for lead_id in old_team_leads:
                if lead_id not in team_serializer.data['team_leads']:
                    lead = UserProfile.objects.get(id = int(lead_id))
                    lead.teams.remove(team_serializer.data['id'])

            for member_id in old_team_members:
                if member_id not in team_serializer.data['team_members']:
                    member = UserProfile.objects.get(id = int(member_id))
                    member.teams.remove(team_serializer.data['id'])
                

            for member_id in team_serializer.data['team_members']:
                member = UserProfile.objects.get(id = int(member_id))
                member.teams.add(team_serializer.data['id'])

            
            return Response(status=status.HTTP_201_CREATED)
        
        print(team_serializer.errors)
        return Response(team_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        team.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        team_serializer = TeamSerializer(team)
        print(team_serializer.data)
        return Response(team_serializer.data, status=status.HTTP_200_OK)
    
    
class Logout(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
          
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
          
@api_view(['GET'])
def GetAllUsernames(request):

    users = User.objects

    if request.method == 'GET':
        return_users = []
        user_serializer = UsernameSerializer(users, context={'request': request}, many=True)
        for user in user_serializer.data:
            return_users.append(user['username'])
        return Response(return_users, status=status.HTTP_200_OK)
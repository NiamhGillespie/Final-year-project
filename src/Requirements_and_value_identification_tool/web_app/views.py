from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Epic, Story, Task
from .serializers import EpicSerializer, StorySerializer, TaskSerializer


@api_view(['GET', 'POST', 'DELETE'])
def EpicDashboardInfo(request):
    if request.method == 'GET':
        print("getting data...")

        epic_data =  Epic.objects.all()
        epic_serializer = EpicSerializer(epic_data, context={'request': request}, many=True)

        story_data =  Story.objects.all()
        story_serializer = StorySerializer(story_data, context={'request': request}, many=True)

        epic_and_story_data = [epic_serializer.data, story_serializer.data]
        
        return Response(epic_and_story_data)
    
    if request.method == 'POST':

        if (request.data.get('dashboard_id')):
            epic_serializer = EpicSerializer(data=request.data)
            
            if epic_serializer.is_valid():
                print("adding epic...")
                epic_serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(epic_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if (request.data.get('story_id')):
            story_serializer = StorySerializer(data=request.data)
            story_serializer.is_valid()
            if story_serializer.is_valid():
                print("adding story...")
                story_serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            else: 
                return Response(story_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    



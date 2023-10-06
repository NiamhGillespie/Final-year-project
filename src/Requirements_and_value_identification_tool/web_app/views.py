from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Epic, Story, Task
from .serializers import EpicSerializer, StorySerializer, TaskSerializer


@api_view(['GET', 'POST'])
def EpicDashboardInfo(request):
    if request.method == 'GET':

        epic_data =  Epic.objects.all()
        epic_serializer = EpicSerializer(epic_data, context={'request': request}, many=True)

        story_data =  Story.objects.all()
        story_serializer = StorySerializer(story_data, context={'request': request}, many=True)

        epic_and_story_data = [epic_serializer.data, story_serializer.data]
        print("getting data...")
        print(story_serializer.data)
        return Response(epic_and_story_data)
    
    if request.method == 'POST':

        epic_serializer = EpicSerializer(data=request.data)
        if epic_serializer.is_valid():
            epic_serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        print(epic_serializer)
        return Response(epic_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    



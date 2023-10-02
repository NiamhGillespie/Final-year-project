from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Epic, Story, Task
from .serializers import EpicSerializer, StorySerializer, TaskSerializer


@api_view(['GET'])
def EpicDashboardInfo(request):
    if request.method == 'GET':

        epic_data =  Epic.objects.all()
        epic_serializer = EpicSerializer(epic_data, context={'request': request}, many=True)

        story_data =  Story.objects.all()
        story_serializer = StorySerializer(story_data, context={'request': request}, many=True)

        epic_and_story_data = [epic_serializer.data, story_serializer.data]

        return Response(epic_and_story_data)
    
    



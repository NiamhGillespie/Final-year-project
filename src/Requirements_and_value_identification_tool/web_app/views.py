from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Epic, Story, Task
from .serializers import EpicSerializer, StorySerializer, TaskSerializer


@api_view(['GET', 'POST'])
def EpicDashboardInfo(request):
    if request.method == 'GET':
        print("getting data...")

        epic_data =  Epic.objects.all()
        epic_serializer = EpicSerializer(epic_data, context={'request': request}, many=True)

        story_data =  Story.objects.all().order_by('order')
        story_serializer = StorySerializer(story_data, context={'request': request}, many=True)

        epic_and_story_data = [epic_serializer.data, story_serializer.data]
        
        return Response(epic_and_story_data)
    
    if request.method == 'POST':
        
        if (request.data.get('dashboard_id')):
            epic_serializer = EpicSerializer(data=request.data)
            
            if epic_serializer.is_valid():
                print("adding epic...")
                epic_serializer.save()
                epic_id = epic_serializer.data['id']
                
                Epic.objects.filter(id=epic_id).update(epic_id = epic_id)
            

                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(epic_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if (request.data.get('story_id')):
            story_serializer = StorySerializer(data=request.data)
            
            if story_serializer.is_valid():
                print("adding story...")
                story_serializer.save()
                print(story_serializer.data)
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
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(epic_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        epic.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    elif request.method == 'GET':
        epic_serializer = EpicSerializer(epic)
        return Response(epic_serializer.data, status=status.HTTP_204_NO_CONTENT)
    

@api_view(['PUT', 'DELETE', 'GET'])
def StoryDetails(request, story_id):
    try:
        story = Story.objects.get(story_id=story_id)
    except Story.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        print('putting...')
        story_serializer = StorySerializer(story, data=request.data,context={'request': request})
        if story_serializer.is_valid():
            story_serializer.save()
            print(story_serializer.data)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(story_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        story.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        story_serializer = StorySerializer(story)
        return Response(story_serializer.data, status=status.HTTP_204_NO_CONTENT)    

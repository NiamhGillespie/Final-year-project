import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Requirements_and_value_identification_tool.settings')

import django
from datetime import datetime
django.setup()
from web_app.models import Epic, Story, Task, Tag

def populate():
    epics = [
        {
            'epic_id': '1',
            'epic_colour': 'c93434',
            'dashboard_id': '0',
            'title': 'Epic for testing',
            'order': 1,
            'last_edited_by': 'Niamh',
            'last_edited': datetime(2023, 10, 3, 15),
            'created_by': 'Niamh',
            'time_created': datetime(2023, 10, 3, 15),
        }
    ]

    for epic in epics:
        add_epic(epic['epic_id'], epic['epic_colour'], epic['dashboard_id'], epic['title'], epic['order'], epic['last_edited_by'], 
                 epic['last_edited'], epic['created_by'], epic['time_created'])
        
    stories = [
        {
            'story_id': '1',
            'epic_id': '1',
            'title': 'Story for testing',
            'order': 1,
            'user_story': 'As a developer, I want to have a test story, so I can use it in the react app',
            'definition_of_done': 'Test story should display on REST framework page',
            'value_statement': 'Means I do not need to add a story to display it',
            'priority': 'MEDIUM',
            'pairable': False,
            'assigned_to': 'Niamh',
            'last_edited_by': 'Niamh',
            'last_edited': datetime(2023, 10, 3, 15),
            'created_by': 'Niamh',
            'time_created': datetime(2023, 10, 3, 15),
        }
    ]

    for story in stories:
        add_story(story['story_id'], story['epic_id'], story['title'], story['order'], story['user_story'], 
                story['definition_of_done'], story['value_statement'], story['priority'], 
                story['pairable'], story['assigned_to'], story['last_edited_by'],
                story['last_edited'], story['created_by'], story['time_created'])
        
    tags = [
        {
            'tag_id': '0',
            'team_id': '0000',
            'title': 'Test tag',
            'description': "A tag used for testing",
            'colour': 'ffffff'
        }
    ]

    for tag in tags:
        add_tag(tag['title'], tag['description'], tag['colour'], tag['tag_id'], tag['team_id'])

def add_epic(epic_id, epic_colour, dashboard_id, title, order, last_edited_by, last_edited, created_by, time_created):
    epic = Epic.objects.get_or_create(epic_id = epic_id, dashboard_id=dashboard_id, epic_colour = epic_colour, order=order)[0]
    epic.title = title
    epic.last_edited_by = last_edited_by
    epic.last_edited = last_edited
    epic.created_by = created_by
    epic.time_created = time_created
    epic.save()
    return epic

def add_story(story_id, epic_id, title, order, user_story, definition_of_done, value_statement, priority,
              pairable, assigned_to,  last_edited_by, last_edited, created_by, time_created):
    story = Story.objects.get_or_create(story_id=story_id, epic_id=epic_id)[0]
    story.title = title
    story.order = order
    story.user_story = user_story
    story.definition_of_done = definition_of_done
    story.value_statement = value_statement
    story.priority = priority
    story.pairable = pairable
    story.assigned_to = assigned_to
    story.last_edited_by = last_edited_by
    story.last_edited = last_edited
    story.created_by = created_by
    story.time_created = time_created
    story.save()
    return story

def add_tag(title, description, colour, tag_id, team_id):
    tag = Tag.objects.get_or_create(id=tag_id)[0]
    tag.title = title
    tag.team_id = team_id
    tag.description = description
    tag.colour = colour
    tag.save()
    return tag

if __name__ == '__main__':
    print('Populating...')
    populate()
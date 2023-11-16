import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Requirements_and_value_identification_tool.settings')

import django
from datetime import datetime
django.setup()
from web_app.models import *

def populate():
    tracking_columns = [
        {
            'column_id': '0',
            'dashboard_id': '0000',
            'team_id': '0000',
            'title': 'Backlog',
            'mark_as_complete': False
        }
    ]

    for column in tracking_columns:
        add_tracking_column(column['column_id'], column['dashboard_id'], column['team_id'], column['title'], column['mark_as_complete'])

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


    value_tags = [
        {
            'tag_id': '0',
            'team_id': '0000',
            'title': 'Test value tag',
            'description': "A value tag used for testing",
            'sub_values': [],
            'colour': '9fdddf'
        },
        {
            'tag_id': '1',
            'team_id': '0000',
            'title': 'Test value tag #2',
            'description': "A tag used for testing",
            'sub_values': [],
            'colour': 'f57f22'
        }
    ]

    for value_tag in value_tags:
        add_value_tag(value_tag['title'], value_tag['description'], value_tag['colour'], value_tag['tag_id'], value_tag['team_id'], value_tag['sub_values'])


    epics = [
        {
            'epic_id': '1',
            'epic_colour': 'c93434',
            'dashboard_id': '0',
            'title': 'Epic for testing',
            'order': 1,
            'values': [0,1],
            'last_edited_by': 'Niamh',
            'last_edited': datetime(2023, 10, 3, 15),
            'created_by': 'Niamh',
            'time_created': datetime(2023, 10, 3, 15),
        }
    ]

    for epic in epics:
        add_epic(epic['epic_id'], epic['epic_colour'], epic['dashboard_id'], epic['title'], epic['order'], epic['values'], epic['last_edited_by'], 
                 epic['last_edited'], epic['created_by'], epic['time_created'])
        
    stories = [
        {
            'story_id': '1',
            'epic_id': '1',
            'title': 'Story for testing',
            'order': 1,
            'tags': [0],
            'user_story': 'As a developer, I want to have a test story, so I can use it in the react app',
            'definition_of_done': 'Test story should display on REST framework page',
            'values': [0],
            'story_points': 3,
            'priority': 'MEDIUM',
            'pairable': False,
            'assigned_to': 'Niamh',
            'state': 'In progress',
            'last_edited_by': 'Niamh',
            'last_edited': datetime(2023, 10, 3, 15),
            'created_by': 'Niamh',
            'time_created': datetime(2023, 10, 3, 15),
        }
    ]

    for story in stories:
        add_story(story['story_id'], story['epic_id'], story['title'], story['order'], story['tags'], story['user_story'], 
                story['definition_of_done'], story['values'], story['story_points'], story['priority'], 
                story['pairable'], story['assigned_to'], story['state'], story['last_edited_by'],
                story['last_edited'], story['created_by'], story['time_created'])
        

def add_tracking_column(column_id, dashboard_id, team_id, title, mark_as_complete):
    column = TrackingColumn.objects.get_or_create(id=column_id)[0]
    column.dashboard_id = dashboard_id
    column.team_id = team_id
    column.title = title
    column.mark_as_complete = mark_as_complete
    column.save()
    print('populating columns :)')
    return column

def add_tag(title, description, colour, tag_id, team_id):
    tag = Tag.objects.get_or_create(id=tag_id)[0]
    tag.title = title
    tag.team_id = team_id
    tag.description = description
    tag.colour = colour
    tag.save()
    return tag

def add_value_tag(title, description, colour, tag_id, team_id, sub_values):
    tag = ValueTag.objects.get_or_create(id=tag_id)[0]
    tag.title = title
    tag.team_id = team_id
    tag.description = description
    tag.colour = colour
    tag.sub_values.set(sub_values)
    tag.save()
    return tag
    
def add_epic(epic_id, epic_colour, dashboard_id, title, order, values, last_edited_by, last_edited, created_by, time_created):
    epic = Epic.objects.get_or_create(epic_id = epic_id, dashboard_id=dashboard_id, epic_colour = epic_colour, order=order)[0]
    epic.title = title
    epic.last_edited_by = last_edited_by
    epic.last_edited = last_edited
    epic.created_by = created_by
    epic.time_created = time_created
    epic.values.set(values)
    epic.save()
    return epic

def add_story(story_id, epic_id, title, order, tags, user_story, definition_of_done, values, story_points, priority,
              pairable, assigned_to, state, last_edited_by, last_edited, created_by, time_created):
    story = Story.objects.get_or_create(story_id=story_id, epic_id=epic_id)[0]
    story.title = title
    story.order = order
    story.tags.set(tags)
    story.user_story = user_story
    story.definition_of_done = definition_of_done
    story.values.set(values)
    story.story_points = story_points
    story.priority = priority
    story.pairable = pairable
    story.assigned_to = assigned_to
    story.state = state
    story.last_edited_by = last_edited_by
    story.last_edited = last_edited
    story.created_by = created_by
    story.time_created = time_created
    story.save()
    return story


if __name__ == '__main__':
    print('Populating...')
    populate()
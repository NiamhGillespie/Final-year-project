import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Requirements_and_value_identification_tool.settings')

import django
from datetime import datetime
django.setup()
from web_app.models import Epic, Story, Task

def populate():
    epics = [
        {
            'epic_id': '00000000',
            'dashboard_id': '0000000',
            'title': 'Epic for testing',
            'last_edited_by': 'Niamh',
            'last_edited': datetime.now(),
            'created_by': 'Niamh',
            'time_created': datetime.now(),
        }
    ]

    for epic in epics:
        add_epic(epic['epic_id'], epic['dashboard_id'], epic['title'], epic['last_edited_by'], 
                 epic['last_edited'], epic['created_by'], epic['time_created'])

def add_epic(epic_id, dashboard_id, title, last_edited_by, last_edited, created_by, time_created):
    epic = Epic.objects.get_or_create(epic_id=epic_id, dashboard_id=dashboard_id)[0]
    epic.title = title
    epic.last_edited_by = last_edited_by
    epic.last_edited = last_edited
    epic.created_by = created_by
    epic.time_created = time_created
    epic.save()
    return epic

if __name__ == '__main__':
    print('Populating...')
    populate()
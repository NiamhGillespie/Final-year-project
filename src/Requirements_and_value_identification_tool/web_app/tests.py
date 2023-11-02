from django.test import TestCase, Client
from web_app.models import Epic, Story, Tag, ValueTag
from datetime import date
from django.urls import reverse
from collections import OrderedDict
from population_script import populate

client = Client()
class EpicDashboardTests(TestCase):
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/teamName/epicsDashboard returns status code 200
        """
        populate()
        response = client.get('/api/teamName/epicsDashboard')
        self.assertEqual(response.status_code, 200)

    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/teamName/epicsDashboard')
        
        expected_data = [[OrderedDict([('id', 1), ('epic_id', '1'), ('epic_colour', 'c93434'), ('dashboard_id', '0'), ('title', 'Epic for testing'), ('order', 1), ('tags', []), ('values', [0, 1]), ('last_edited_by', 'Niamh'), ('last_edited', '2023-10-03 15:00:00'), ('created_by', 'Niamh'), ('time_created', '2023-10-03 15:00:00')])], 
                         [OrderedDict([('id', 1), ('story_id', '1'), ('epic_id', '1'), ('title', 'Story for testing'), ('order', 1), ('tags', [0]), ('user_story', 'As a developer, I want to have a test story, so I can use it in the react app'), ('definition_of_done', 'Test story should display on REST framework page'), ('values', [0]), ('story_points', '3'), ('priority', 'MEDIUM'), ('pairable', False), ('assigned_to', 'Niamh'), ('state', 'In progress'), ('last_edited_by', 'Niamh'), ('last_edited', '2023-10-03 15:00:00'), ('created_by', 'Niamh'), ('time_created', '2023-10-03 15:00:00')])]]
        self.assertEqual(response.data, expected_data)

    def test_add_epic_POST_request_returns_201(self):
        """
        Check if the POST request on /api/teamName/epicsDashboard returns status code 201
        """
        epic = {
            "id": 0,
            "epic_id": "0",
            "epic_colour": "ffffff",
            "dashboard_id": "0",
            "title": "Test Epic Title",
            "order": 1,
            "values": [],
            "last_edited_by": "Niamh Gillespie",
            "last_edited": "Fri Oct 13 2023",
            "created_by": "Niamh Gillespie",
            "time_created": "Fri Oct 13 2023"
        }
                
        response = client.post('/api/teamName/epicsDashboard', epic)
        self.assertEqual(response.status_code, 201)

    def test_add_story_POST_request_returns_201(self):
        """
        Check if the POST request on /api/teamName/epicsDashboard returns status code 201
        """
        story = {
            "id": 0,
            "story_id": "0",
            "epic_id": "0",
            "title": "Create unit tests for Epic Model",
            "order": 1,
            "user_story": "As a \nI would like to \nSo that I can",
            "definition_of_done": "dod",
            "values": [],
            "priority": "LOW",
            "pairable": True,
            "assigned_to": "Niamh Gillespie",
            "last_edited_by": "Niamh Gillespie",
            "last_edited": "Fri Oct 13 2023",
            "created_by": "Niamh Gillespie",
            "time_created": "Fri Oct 13 2023"
        }
                
        response = client.post('/api/teamName/epicsDashboard', story)
        self.assertEqual(response.status_code, 201)

class EpicCreationTests(TestCase):
    def test_epic_id_created(self):
        """
        Checks to make sure that when an Epic is created, the correct epic_id is added.
        """
        epic = Epic(
                epic_id = '0',
                dashboard_id = '0',
                title = 'Test Epic Title',
                order = 1,
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        epic.save()
        self.assertEqual(epic.epic_id, '0')

    def test_dashboard_id_created(self):
        """
        Checks to make sure that when an Epic is created, the correct dashboard_id is added.
        """
        epic = Epic(
                epic_id = '0',
                dashboard_id = '0',
                title = 'Test Epic Title',
                order = 1,
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        epic.save()
        self.assertEqual(epic.dashboard_id, '0')

    def test_title_created(self):
        """
        Checks to make sure that when an Epic is created, the correct title is added.
        """
        epic = Epic(
                epic_id = '0',
                dashboard_id = '0',
                title = 'Test Epic Title',
                order = 1,
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        epic.save()
        self.assertEqual(epic.title, 'Test Epic Title')

    def test_epic_order_created(self):
        """
        Checks to make sure that when an Epic is created, the correct order is added.
        """
        epic = Epic(
                epic_id = '0',
                dashboard_id = '0',
                title = 'Test Epic Title',
                order = 1,
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        epic.save()
        self.assertEqual(epic.order, 1)

    def test_last_edited_by_field_created(self):
        """
        Checks to make sure that when an Epic is created, the correct last_edited_by is added.
        """
        epic = Epic(
                epic_id = '0',
                dashboard_id = '0',
                title = 'Test Epic Title',
                order = 1,
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        epic.save()
        self.assertEqual(epic.last_edited_by, 'Niamh Gillespie')

    def test_last_edited_field_created(self):
        """
        Checks to make sure that when an Epic is created, the correct last_edited is added.
        """
        epic = Epic(
                epic_id = '0',
                dashboard_id = '0',
                title = 'Test Epic Title',
                order = 1,
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        epic.save()
        self.assertEqual(epic.last_edited, date.today())

    def test_created_by_field_created(self):
        """
        Checks to make sure that when an Epic is created, the correct created_by is added.
        """
        epic = Epic(
                epic_id = '0',
                dashboard_id = '0',
                title = 'Test Epic Title',
                order = 1,
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        epic.save()
        self.assertEqual(epic.created_by, 'Niamh Gillespie')

    def test_time_created_field_created(self):
        """
        Checks to make sure that when an Epic is created, the correct time_created is added.
        """
        epic = Epic(
                epic_id = '0',
                dashboard_id = '0',
                title = 'Test Epic Title',
                order = 1,
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        epic.save()
        self.assertEqual(epic.time_created, date.today())

class StoryCreationTests(TestCase):
    def test_story_id_created(self):
        """
        Checks to make sure that when a Story is created, the correct story_id is added.
        """
        story = Story(
                story_id = '0',
                epic_id = '1',
                title = 'Test Story Title',
                order = 0,
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                priority = 'MEDIUM',
                pairable = False,
                assigned_to = 'Niamh Gillespie',
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        story.save()
        self.assertEqual(story.story_id, '0')

    def test_epic_id_created(self):
        """
        Checks to make sure that when a Story is created, the correct epid_id is added.
        """
        story = Story(
                story_id = '0',
                epic_id = '1',
                title = 'Test Story Title',
                order = 0,
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                priority = 'MEDIUM',
                pairable = False,
                assigned_to = 'Niamh Gillespie',
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        story.save()
        self.assertEqual(story.epic_id, '1')

    def test_title_created(self):
        """
        Checks to make sure that when a Story is created, the correct title is added.
        """
        story = Story(
                story_id = '0',
                epic_id = '1',
                title = 'Test Story Title',
                order = 0,
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                priority = 'MEDIUM',
                pairable = False,
                assigned_to = 'Niamh Gillespie',
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        story.save()
        self.assertEqual(story.title, 'Test Story Title')

    def test_order_created(self):
        """
        Checks to make sure that when a Story is created, the correct order is added.
        """
        story = Story(
                story_id = '0',
                epic_id = '1',
                title = 'Test Story Title',
                order = 0,
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                priority = 'MEDIUM',
                pairable = False,
                assigned_to = 'Niamh Gillespie',
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        story.save()
        self.assertEqual(story.order, 0)

    def test_user_story_created(self):
        """
        Checks to make sure that when a Story is created, the correct user_story is added.
        """
        story = Story(
                story_id = '0',
                epic_id = '1',
                title = 'Test Story Title',
                order = 0,
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                priority = 'MEDIUM',
                pairable = False,
                assigned_to = 'Niamh Gillespie',
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        story.save()
        self.assertEqual(story.user_story, 'As a developer, I want to create unit tests, So that I can continously integrate my code')

    def test_definition_of_done_created(self):
        """
        Checks to make sure that when a Story is created, the correct definition_of_done is added.
        """
        story = Story(
                story_id = '0',
                epic_id = '1',
                title = 'Test Story Title',
                order = 0,
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                priority = 'MEDIUM',
                pairable = False,
                assigned_to = 'Niamh Gillespie',
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        story.save()
        self.assertEqual(story.definition_of_done, 'Set up a unit test suite')

    def test_priority_created(self):
        """
        Checks to make sure that when a Story is created, the correct priority is added.
        """
        story = Story(
                story_id = '0',
                epic_id = '1',
                title = 'Test Story Title',
                order = 0,
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                priority = 'MEDIUM',
                pairable = False,
                assigned_to = 'Niamh Gillespie',
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        story.save()
        self.assertEqual(story.priority, 'MEDIUM')


    def test_pairable_created(self):
        """
        Checks to make sure that when a Story is created, the correct pairable boolean is added.
        """
        story = Story(
                story_id = '0',
                epic_id = '1',
                title = 'Test Story Title',
                order = 0,
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                priority = 'MEDIUM',
                pairable = False,
                assigned_to = 'Niamh Gillespie',
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        story.save()
        self.assertEqual(story.pairable, False)
    
    def test_assigned_to_created(self):
        """
        Checks to make sure that when a Story is created, the correct assigned_to is added.
        """
        story = Story(
                story_id = '0',
                epic_id = '1',
                title = 'Test Story Title',
                order = 0,
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                priority = 'MEDIUM',
                pairable = False,
                assigned_to = 'Niamh Gillespie',
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        story.save()
        self.assertEqual(story.assigned_to, 'Niamh Gillespie')

    def test_last_edited_by_created(self):
        """
        Checks to make sure that when a Story is created, the correct assigned_to is added.
        """
        story = Story(
                story_id = '0',
                epic_id = '1',
                title = 'Test Story Title',
                order = 0,
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                priority = 'MEDIUM',
                pairable = False,
                assigned_to = 'Niamh Gillespie',
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        story.save()
        self.assertEqual(story.last_edited_by, 'Niamh Gillespie')

    def test_last_edited_created(self):
        """
        Checks to make sure that when a Story is created, the correct last_edited is added.
        """
        story = Story(
                story_id = '0',
                epic_id = '1',
                title = 'Test Story Title',
                order = 0,
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                priority = 'MEDIUM',
                pairable = False,
                assigned_to = 'Niamh Gillespie',
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        story.save()
        self.assertEqual(story.last_edited, date.today())


    def test_created_by_created(self):
        """
        Checks to make sure that when a Story is created, the correct created_by is added.
        """
        story = Story(
                story_id = '0',
                epic_id = '1',
                title = 'Test Story Title',
                order = 0,
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                priority = 'MEDIUM',
                pairable = False,
                assigned_to = 'Niamh Gillespie',
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        story.save()
        self.assertEqual(story.created_by, 'Niamh Gillespie')

    def test_time_created_created(self):
        """
        Checks to make sure that when a Story is created, the correct time_created is added.
        """
        story = Story(
                story_id = '0',
                epic_id = '1',
                title = 'Test Story Title',
                order = 0,
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                priority = 'MEDIUM',
                pairable = False,
                assigned_to = 'Niamh Gillespie',
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        story.save()
        self.assertEqual(story.time_created, date.today())

class TagCreationTests(TestCase):
    def test_tag_created(self):
        """
        Checks to make sure that when a Tag is created, the correct information is added.
        """
        tag = Tag(
                tag_id = '0',
                team_id = '0000',
                title = 'Test Tag Title',
                description = "description...",
                colour = 'ffffff'
            )
        tag.save()
        self.assertEqual(tag.tag_id, '0')
        self.assertEqual(tag.team_id, '0000')
        self.assertEqual(tag.title, 'Test Tag Title')
        self.assertEqual(tag.description, 'description...')
        self.assertEqual(tag.colour, 'ffffff')

class ValueTagCreationTests(TestCase):
    def test__value_tag_created(self):
        """
        Checks to make sure that when a ValueTag is created, the correct information is added.
        """
        value = ValueTag(
                tag_id = '0',
                team_id = '0000',
                title = 'Test Tag Title',
                description = "description...",
                colour = 'ffffff'
            )
        value.save()
        self.assertEqual(value.tag_id, '0')
        self.assertEqual(value.team_id, '0000')
        self.assertEqual(value.title, 'Test Tag Title')
        self.assertEqual(value.description, 'description...')
        self.assertEqual(value.colour, 'ffffff')
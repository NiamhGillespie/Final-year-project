from datetime import date
from django.test import TestCase, Client
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

    def test_add_epic_POST_request_returns_201_with_multiple_epics(self):
        """
        Check if the POST request on /api/teamName/epicsDashboard returns status code 201 with multiple epics
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
        response2 = client.post('/api/teamName/epicsDashboard', epic)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response2.status_code, 201)

    def test_bad_add_epic_POST_request_returns_400(self):
        """
        Check if the bad POST request on /api/teamName/epicsDashboard returns status code 400
        """
        epic = {
            "id": 0,
            "epic_id": "0",
            "epic_colour": "ffffff",
            "dashboard_id": "0",
            "title": "Bad Epic Title",
        }
                
        response = client.post('/api/teamName/epicsDashboard', epic)
        self.assertEqual(response.status_code, 400)

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

    def test_add_story_POST_request_returns_201_with_more_than_one_story(self):
        """
        Check if the POST request on /api/teamName/epicsDashboard returns status code 201 with more than 1 story
        """
        story = {
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
        response2 = client.post('/api/teamName/epicsDashboard', story)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response2.status_code, 201)

    def test_bad_add_story_POST_request_returns_400(self):
        """
        Check if the bad POST request on /api/teamName/epicsDashboard returns status code 400
        """
        story = {
            "id": 0,
            "story_id": "0",
            "epic_id": "0",
            "title": "Bad request",
        }
                
        response = client.post('/api/teamName/epicsDashboard', story)
        self.assertEqual(response.status_code, 400)

    def test_bad_add_other_POST_request_returns_400(self):
        """
        Check if the bad POST request on /api/teamName/epicsDashboard returns status code 400
        """
        not_story_or_epic = {
            "title": "I should return a 400"
        }
                
        response = client.post('/api/teamName/epicsDashboard', not_story_or_epic)
        self.assertEqual(response.status_code, 400)


class TeamTagTests(TestCase):
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/teamName/tags returns status code 200
        """
        populate()
        response = client.get('/api/teamName/tags')
        self.assertEqual(response.status_code, 200)

    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/teamName/tags')
        
        expected_data = [OrderedDict([('id', 0), ('tag_id', 'error'), ('team_id', '0000'), ('title', 'Test tag'), 
                        ('description', 'A tag used for testing'), ('colour', 'ffffff')])]
        self.assertEqual(response.data, expected_data)

    def test_add_tag_POST_request_returns_201(self):
        """
        Check if the POST request on /api/teamName/tags returns status code 201
        """
        tag = {
            'tag_id': '0',
            'team_id': '0000',
            'title': 'Test tag',
            'description': "A tag used for testing",
            'colour': 'ffffff'
        }
                
        response = client.post('/api/teamName/tags', tag)
        self.assertEqual(response.status_code, 201)

    def test_bad_add_tag_POST_request_returns_400(self):
        """
        Check if the bad POST request on /api/teamName/tags returns status code 400
        """
        tag = {
            'tag_id': '0',
            'team_id': '0000',
            'title': 'Bad Test tag',
        }
                
        response = client.post('/api/teamName/tags', tag)
        self.assertEqual(response.status_code, 400)


class ValueTagTests(TestCase):
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on api/teamName/values returns status code 200
        """
        populate()
        response = client.get('/api/teamName/values')
        self.assertEqual(response.status_code, 200)

    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/teamName/values')
        
        expected_data = [OrderedDict([('id', 0), ('tag_id', 'error'), ('team_id', '0000'), ('title', 'Test value tag'), ('description', 'A value tag used for testing'), ('sub_values', []), ('colour', '9fdddf')]), 
                         OrderedDict([('id', 1), ('tag_id', 'error'), ('team_id', '0000'), ('title', 'Test value tag #2'), ('description', 'A tag used for testing'), ('sub_values', []), ('colour', 'f57f22')])]
        self.assertEqual(response.data, expected_data)

    def test_add_value_POST_request_returns_201(self):
        """
        Check if the POST request on /api/teamName/tags returns status code 201
        """
        value = {
            'tag_id': '0',
            'team_id': '0000',
            'title': 'Test value tag',
            'description': "A value tag used for testing",
            'sub_values': [],
            'colour': '9fdddf'
        }
                
        response = client.post('/api/teamName/values', value)
        self.assertEqual(response.status_code, 201)

    def test_bad_add_value_POST_request_returns_400(self):
        """
        Check if the bad POST request on /api/teamName/values returns status code 400
        """
        value = {
            'tag_id': '0',
            'team_id': '0000',
            'title': 'Bad Test tag',
        }
                
        response = client.post('/api/teamName/values', value)
        self.assertEqual(response.status_code, 400)

class TrackingColumnTests(TestCase):
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on api/teamName/tracking-columns returns status code 200
        """
        populate()
        response = client.get('/api/teamName/tracking-columns')
        self.assertEqual(response.status_code, 200)

    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/teamName/tracking-columns')
        
        expected_data = [OrderedDict([('id', 0), ('column_id', 'error'), ('dashboard_id', '0000'), ('team_id', '0000'), ('title', 'Backlog'), ('mark_as_complete', False), ('stories', []), ('story_list', ''), ('WIP', 10)])]
        self.assertEqual(response.data, expected_data)

    def test_add_value_POST_request_returns_201(self):
        """
        Check if the POST request on /api/teamName/tracking-columns returns status code 201
        """
        column = {
            'column_id': '0',
            'dashboard_id': '0000',
            'team_id': '0000',
            'title': 'Backlog',
            'mark_as_complete': False,
            'stories': [],
            'WIP': 10
        }
                
        response = client.post('/api/teamName/tracking-columns', column)
        self.assertEqual(response.status_code, 201)

    def test_bad_add_value_POST_request_returns_400(self):
        """
        Check if the bad POST request on /api/teamName/tracking-columns returns status code 400
        """
        column = {
            'column_id': '0',
            'dashboard_id': '0000',
            'team_id': '0000',
            'title': 'Bad column',
            'mark_as_complete': 'not boolean',
        }
                
        response = client.post('/api/teamName/tracking-columns', column)
        self.assertEqual(response.status_code, 400)

class SprintTests(TestCase):
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on api/teamName/sprints returns status code 200
        """
        populate()
        response = client.get('/api/teamName/sprints')
        self.assertEqual(response.status_code, 200)

    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/teamName/sprints')
        
        expected_data = [OrderedDict([('id', 0), ('sprint_id', 'error'), ('dashboard_id', '0000'), ('start_date', '2023-12-28'), ('end_date', '2023-12-28'), ('stories', []), ('story_list', '')])]
        self.assertEqual(response.data, expected_data)

    def test_add_value_POST_request_returns_201(self):
        """
        Check if the POST request on /api/teamName/sprints returns status code 201
        """
        sprint = {
            'sprint_id': '0',
            'dashboard_id': '0000',
            'start_date': date.today(),
            'end_date': date.today(),
            'stories': [],
            'story_list': ''
        }
                
        response = client.post('/api/teamName/sprints', sprint)
        self.assertEqual(response.status_code, 201)

    def test_bad_add_value_POST_request_returns_400(self):
        """
        Check if the bad POST request on /api/teamName/sprints returns status code 400
        """
        sprint = {
            'sprint_id': '000000000000000000',
            'dashboard_id': '0000',
            'start_date': date.today(),
            'end_date': date.today(),
            'stories': [],
            'story_list': ''
        }
                
        response = client.post('/api/teamName/sprints', sprint)
        self.assertEqual(response.status_code, 400)
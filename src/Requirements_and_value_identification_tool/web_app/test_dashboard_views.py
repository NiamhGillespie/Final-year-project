from datetime import date, datetime
from django.test import TestCase, Client
from collections import OrderedDict
from population_script import populate

client = Client()

class EpicDashboardTests(TestCase):
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/0/epicsDashboard returns status code 200
        """
        populate()
        response = client.get('/api/0/epicsDashboard')
        self.assertEqual(response.status_code, 200)


    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/0/epicsDashboard')
    
        expected_data = [[OrderedDict([('id', 1), ('epic_id', '1'), ('epic_colour', 'c93434'), ('team_id', '0'), ('title', 'Epic for testing'), ('order', 1), ('tags', []), ('values', [0, 1]), ('last_edited_by', 'Niamh'), ('last_edited', '2023-10-03 15:00:00'), ('created_by', 'Niamh'), ('time_created', '2023-10-03 15:00:00'), ('completed', False)])], []]
        self.assertEqual(response.data, expected_data)

    def test_add_epic_POST_request_returns_201(self):
        """
        Check if the POST request on /api/0/epicsDashboard returns status code 201
        """
        epic = {
            "id": 0,
            "epic_id": "0",
            "epic_colour": "ffffff",
            "title": "Test Epic Title",
            "order": 1,
            "team_id": "0",
            "values": [],
            "last_edited_by": "Niamh Gillespie",
            "last_edited": "Fri Oct 13 2023",
            "created_by": "Niamh Gillespie",
            "time_created": "Fri Oct 13 2023"
        }
                
        response = client.post('/api/0/epicsDashboard', epic)
        self.assertEqual(response.status_code, 201)

    def test_add_epic_POST_request_returns_201_with_multiple_epics(self):
        """
        Check if the POST request on /api/0/epicsDashboard returns status code 201 with multiple epics
        """
        epic = {
            "id": 0,
            "epic_id": "0",
            "epic_colour": "ffffff",
            "title": "Test Epic Title",
            "order": 1,
            "team_id": "0",
            "values": [],
            "last_edited_by": "Niamh Gillespie",
            "last_edited": "Fri Oct 13 2023",
            "created_by": "Niamh Gillespie",
            "time_created": "Fri Oct 13 2023"
        }
                
        response = client.post('/api/0/epicsDashboard', epic)
        response2 = client.post('/api/0/epicsDashboard', epic)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response2.status_code, 201)

    def test_bad_add_epic_POST_request_returns_400(self):
        """
        Check if the bad POST request on /api/0/epicsDashboard returns status code 400
        """
        epic = {
            "id": 0,
            "epic_id": "0",
            "epic_colour": "ffffff",
            "title": "Bad Epic Title",
        }
                
        response = client.post('/api/0/epicsDashboard', epic)
        self.assertEqual(response.status_code, 400)

    def test_add_story_POST_request_returns_201(self):
        """
        Check if the POST request on /api/0/epicsDashboard returns status code 201
        """
        story = {
            "id": 0,
            "story_id": "0",
            "epic_id": "0",
            "title": "Create unit tests for Epic Model",
            "team_id": "0",
            "order": 1,
            "user_story": "As a \nI would like to \nSo that I can",
            "definition_of_done": "dod",
            "values": [],
            "priority": "LOW",
            "pairable": True,
            "assigned_to": [],
            "last_edited_by": "Niamh Gillespie",
            "last_edited": "Fri Oct 13 2023",
            "created_by": "Niamh Gillespie",
            "time_created": "Fri Oct 13 2023"
        }
                
        response = client.post('/api/0/epicsDashboard', story)
        self.assertEqual(response.status_code, 201)

    def test_add_story_POST_request_returns_201_with_more_than_one_story(self):
        """
        Check if the POST request on /api/0/epicsDashboard returns status code 201 with more than 1 story
        """
        story = {
            "story_id": "0",
            "epic_id": "0",
            "title": "Create unit tests for Epic Model",
            "team_id": "0",
            "order": 1,
            "user_story": "As a \nI would like to \nSo that I can",
            "definition_of_done": "dod",
            "values": [],
            "priority": "LOW",
            "pairable": True,
            "assigned_to": [],
            "last_edited_by": "Niamh Gillespie",
            "last_edited": "Fri Oct 13 2023",
            "created_by": "Niamh Gillespie",
            "time_created": "Fri Oct 13 2023"
        }
                
        response = client.post('/api/0/epicsDashboard', story)
        response2 = client.post('/api/0/epicsDashboard', story)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response2.status_code, 201)

    def test_bad_add_story_POST_request_returns_400(self):
        """
        Check if the bad POST request on /api/0/epicsDashboard returns status code 400
        """
        story = {
            "id": 0,
            "story_id": "0",
            "epic_id": "0",
            "title": "Bad request",
        }
                
        response = client.post('/api/0/epicsDashboard', story)
        self.assertEqual(response.status_code, 400)

    def test_bad_add_other_POST_request_returns_400(self):
        """
        Check if the bad POST request on /api/0/epicsDashboard returns status code 400
        """
        not_story_or_epic = {
            "title": "I should return a 400"
        }
                
        response = client.post('/api/0/epicsDashboard', not_story_or_epic)
        self.assertEqual(response.status_code, 400)

class TeamTagTests(TestCase):
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/0/tags returns status code 200
        """
        populate()
        response = client.get('/api/0/tags')
        self.assertEqual(response.status_code, 200)

    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/0/tags')
        expected_data = [OrderedDict([('id', 0), ('tag_id', 'error'), ('team_id', '0'), ('title', 'Test tag'), ('description', 'A tag used for testing'), ('colour', 'ffffff')])]
        self.assertEqual(response.data, expected_data)

    def test_add_tag_POST_request_returns_201(self):
        """
        Check if the POST request on /api/0/tags returns status code 201
        """
        tag = {
            'tag_id': '0',
            'team_id': '0000',
            'title': 'Test tag',
            'description': "A tag used for testing",
            'colour': 'ffffff'
        }
                
        response = client.post('/api/0/tags', tag)
        self.assertEqual(response.status_code, 201)

    def test_bad_add_tag_POST_request_returns_400(self):
        """
        Check if the bad POST request on /api/0/tags returns status code 400
        """
        tag = {
            'tag_id': '0',
            'team_id': '0000',
            'title': 'Bad Test tag',
        }
                
        response = client.post('/api/0/tags', tag)
        self.assertEqual(response.status_code, 400)

class ValueTagTests(TestCase):
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on api/0/values returns status code 200
        """
        populate()
        response = client.get('/api/0/values')
        self.assertEqual(response.status_code, 200)

    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/0/values')

        expected_data = [OrderedDict([('id', 0), ('tag_id', 'error'), ('team_id', '0'), ('title', 'Test value tag'), ('description', 'A value tag used for testing'), ('sub_values', []), ('colour', '9fdddf')]), OrderedDict([('id', 1), ('tag_id', 'error'), ('team_id', '0'), ('title', 'Test value tag #2'), ('description', 'A tag used for testing'), ('sub_values', []), ('colour', 'f57f22')])]
        self.assertEqual(response.data, expected_data)

    def test_add_value_POST_request_returns_201(self):
        """
        Check if the POST request on /api/0/tags returns status code 201
        """
        value = {
            'tag_id': '0',
            'team_id': '0000',
            'title': 'Test value tag',
            'description': "A value tag used for testing",
            'sub_values': [],
            'colour': '9fdddf'
        }
        
        response = client.post('/api/0/values', value)
        self.assertEqual(response.status_code, 201)

    def test_bad_add_value_POST_request_returns_400(self):
        """
        Check if the bad POST request on /api/0/values returns status code 400
        """
        value = {
            'tag_id': '0',
            'team_id': '0000',
            'title': 'Bad Test tag',
        } 
        response = client.post('/api/0/values', value)
        self.assertEqual(response.status_code, 400)

class TrackingColumnTests(TestCase):
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on api/0/tracking-columns returns status code 200
        """
        populate()
        response = client.get('/api/0/tracking-columns')
        self.assertEqual(response.status_code, 200)

    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/0/tracking-columns')

        expected_data = [OrderedDict([('id', 0), ('column_id', 'error'), ('dashboard_id', 'error'), ('team_id', '0'), ('title', 'Backlog'), ('mark_as_complete', False), ('stories', []), ('story_list', ''), ('WIP', 10)])]
        self.assertEqual(response.data, expected_data)

    def test_add_value_POST_request_returns_201(self):
        """
        Check if the POST request on /api/0/tracking-columns returns status code 201
        """
        column = {
            'column_id': '0',
            'team_id': '0000',
            'title': 'Backlog',
            'mark_as_complete': False,
            'stories': [],
            'WIP': 10
        }
                
        response = client.post('/api/0/tracking-columns', column)
        self.assertEqual(response.status_code, 201)

    def test_bad_add_value_POST_request_returns_400(self):
        """
        Check if the bad POST request on /api/0/tracking-columns returns status code 400
        """
        column = {
            'column_id': '0',
            'team_id': '0000',
            'title': 'Bad column',
            'mark_as_complete': 'not boolean',
        }
                
        response = client.post('/api/0/tracking-columns', column)
        self.assertEqual(response.status_code, 400)
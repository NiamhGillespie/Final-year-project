from datetime import date
import datetime
from django.test import TestCase, Client
from collections import OrderedDict
from population_script import populate


client = Client()

class CurrentSprintTests(TestCase):    
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/teamName/current-sprintreturns status code 200
        """
        populate()
        response = client.get('/api/teamName/current-sprint')
        self.assertEqual(response.status_code, 200)

    def test_GET_request_expected_data_with_current_sprint(self):
        populate()
        response = client.get('/api/teamName/current-sprint')
        
        expected_data = [OrderedDict([('id', 0), ('sprint_id', 'error'), ('dashboard_id', '0000'), ('start_date', '2023-12-22'), ('end_date', '2023-12-22'), ('stories', []), ('story_list', '')])]
        self.assertEqual(response.data, expected_data)

    def test_GET_request_expected_data_no_current_sprint(self):
        response = client.get('/api/teamName/current-sprint')
        
        expected_data = {}
        self.assertEqual(response.data, expected_data)
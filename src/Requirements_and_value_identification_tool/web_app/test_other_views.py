from datetime import date, datetime
from django.test import TestCase, Client
from collections import OrderedDict
from population_script import populate

client = Client()


class OrganisationTests(TestCase):
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/organisations returns status code 200
        """
        populate()
        response = client.get('/api/organisations')
        self.assertEqual(response.status_code, 200)


    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/organisations')
    
        expected_data = [OrderedDict([('id', 1), ('name', 'Niamh Inc'), ('teams', []), ('users', [])])]
        self.assertEqual(response.data, expected_data)

    def test_add_epic_POST_request_returns_201(self):
        """
        Check if the POST request on /api/0/epicsDashboard returns status code 201
        """
        organisation = {
            "id": 0,
            "name": "Niamh Inc"
        }
                
        response = client.post('/api/organisations', organisation)
        self.assertEqual(response.status_code, 201)

class OrganisationTests(TestCase):
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/organisations returns status code 200
        """
        populate()
        response = client.get('/api/organisations')
        self.assertEqual(response.status_code, 200)


    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/organisations')

        expected_data = [OrderedDict([('id', 1), ('name', 'Niamh Inc'), ('teams', []), ('users', [])]), OrderedDict([('id', 2), ('name', 'Test org'), ('teams', []), ('users', [])])]
        self.assertEqual(response.data, expected_data)

    def test_add_epic_POST_request_returns_201(self):
        """
        Check if the POST request on /api/0/epicsDashboard returns status code 201
        """
        organisation = {
            "id": 0,
            "name": "Niamh Inc"
        }
                
        response = client.post('/api/organisations', organisation)
        self.assertEqual(response.status_code, 201)

class UserTests(TestCase):
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/0/admin/users returns status code 200
        """
        populate()
        response = client.get('/api/2/admin/users')
        self.assertEqual(response.status_code, 200)


    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/2/admin/users')

        expected_data = [OrderedDict([('id', 1), ('belongs_to', 2), ('username', 'naimhgilndsl'), ('password', 'passwrod123!'), ('email', 'fake@email.com'), ('first_name', 'Niamh'), ('surname', 'Gillespie'), ('role', 'error'), ('teams', []), ('profile_photo', None)])]
        self.assertEqual(response.data, expected_data)

    # def test_add_epic_POST_request_returns_201(self):
    #     """
    #     Check if the POST request on /api/2/admin/users returns status code 201
    #     """
    #     user = {
    #         "id": 0,
    #         "name": "Niamh Inc",
    #         "belongs_to": 1
    #     }
                
    #     response = client.post('/api/2/admin/users', user)
    #     self.assertEqual(response.status_code, 201)
        
class TeamTests(TestCase):
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/0/admin/teams returns status code 200
        """
        populate()
        response = client.get('/api/0/admin/teams')
        self.assertEqual(response.status_code, 200)


    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/2/admin/teams')
    
        expected_data = [OrderedDict([('id', 0), ('belongs_to', 2), ('team_name', 'error'), ('team_photo', None), ('team_leads', []), ('team_members', [])])]
        self.assertEqual(response.data, expected_data)

    def test_add_epic_POST_request_returns_201(self):
        """
        Check if the POST request on /api/0/admin/teams returns status code 201
        """
        team = {
            "id": "2",
            "team_name": "Team Two",
        }
                
        response = client.post('/api/0/admin/teams', team)
        self.assertEqual(response.status_code, 201)

class GetAllUsernameTests(TestCase):
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/getUsernames returns status code 200
        """
        populate()
        response = client.get('/api/getUsernames')
        self.assertEqual(response.status_code, 200)


    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/getUsernames')
    
        expected_data = ['naimhgilndsl']
        self.assertEqual(response.data, expected_data)

from datetime import date, datetime
from django.test import TestCase, Client
from population_script import populate

client = Client()

class EpicDetailsTests(TestCase):    
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/teamName/epics/([0-9]*)/details$ returns status code 200
        """
        populate()
        response = client.get('/api/teamName/epics/1/details')
        self.assertEqual(response.status_code, 200)


    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/teamName/epics/1/details')

        expected_data = {'id': 1, 'epic_id': '1', 'epic_colour': 'c93434', 'team_id': '0', 'title': 'Epic for testing', 'order': 1, 'tags': [], 'values': [0, 1], 'last_edited_by': 'Niamh', 'last_edited': '2023-10-03 15:00:00', 'created_by': 'Niamh', 'time_created': '2023-10-03 15:00:00', 'completed': False}
        self.assertEqual(response.data, expected_data)

    def test_bad_GET_request(self):
        populate()
        response = client.get('/api/teamName/epics/101/details')
        
        self.assertEqual(response.status_code, 404)

    def test_add_epic_PUT_request_returns_201(self):
        """
        Check if the PUT request on /api/teamName/epics/1/details returns status code 201
        """
        epic = {'id': 1, 
         'epic_id': '1', 
         'epic_colour': 'c93434', 
         'team_id': '0', 
         'title': 'NEW TITLE', 
         'order': 1, 
         'tags': [], 
         'values': [0, 1], 
         'last_edited_by': 'Niamh', 
         'last_edited': '2023-10-03 15:00:00', 
         'created_by': 'Niamh', 
         'time_created': '2023-10-03 15:00:00'
        }
        

        populate()       
        response = client.put('/api/teamName/epics/1/details', data=epic,  content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_bad_add_epic_PUT_request_returns_400(self):
        """
        Check if the bad PUT request on /api/teamName/epics/1/details returns status code 400
        """
        epic = {
            "id": 0,
            "epic_id": "0",
            "epic_colour": "ffffff",
            "team_id": "0",
            "title": "Bad Epic Title",
        }
        
        populate()       
        response = client.put('/api/teamName/epics/1/details', data=epic,  content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_add_epic_DELETE_request_returns_204(self):
        """
        Check if the DELETE request on /api/teamName/epics/1/details returns status code 204
        """

        populate()       
        response = client.delete('/api/teamName/epics/1/details')
        self.assertEqual(response.status_code, 204)

class StoryDetailsTests(TestCase):    
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/teamName/stories/([0-9]*)/details$ returns status code 200
        """
        populate()
        response = client.get('/api/teamName/stories/1/details')
        self.assertEqual(response.status_code, 200)


    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/teamName/stories/1/details')
        
        expected_data = {'id': 1, 'story_id': '1', 'epic_id': '1', 'team_id': '', 'title': 'Story for testing', 'order': 1, 'tags': [0], 'user_story': 'As a developer, I want to have a test story, so I can use it in the react app', 'definition_of_done': 'Test story should display on REST framework page', 'values': [0], 'story_points': '3', 'priority': 'MEDIUM', 'pairable': False, 'assigned_to': [], 'state': 'In progress', 'completed': False, 'last_edited_by': 'Niamh', 'last_edited': '2023-10-03 15:00:00', 'created_by': 'Niamh', 'time_created': '2023-10-03 15:00:00'}
        self.assertEqual(response.data, expected_data)

    def test_bad_GET_request(self):
        populate()
        response = client.get('/api/teamName/stories/101/details')
        
        self.assertEqual(response.status_code, 404)

    def test_add_story_PUT_request_returns_201(self):
        """
        Check if the PUT request on /api/teamName/stories/1/details returns status code 201
        """
        story = {
            'story_id': '1',
            'epic_id': '1',
            'team_id': '0',
            'title': 'Story for testing',
            'order': 1,
            'tags': [0],
            'user_story': 'As a developer, I want to have a test story, so I can use it in the react app',
            'definition_of_done': 'Test story should display on REST framework page',
            'values': [0],
            'story_points': 3,
            'priority': 'MEDIUM',
            'pairable': False,
            'assigned_to': [],
            'state': 'In progress',
            'last_edited_by': 'Niamh',
            'last_edited': date.today(),
            'created_by': 'Niamh',
            'time_created': date.today(),
        }
        

        populate()       
        response = client.put('/api/teamName/stories/1/details', data=story,  content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_bad_add_story_PUT_request_returns_400(self):
        """
        Check if the bad PUT request on /api/teamName/stories/1/details returns status code 400
        """
        story = {
            'story_id': '1',
            'epic_id': '1',
            'title': 'Story for testing',
        }
        
        populate()       
        response = client.put('/api/teamName/stories/1/details', data=story,  content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_add_story_DELETE_request_returns_204(self):
        """
        Check if the DELETE request on /api/teamName/stories/1/details returns status code 204
        """

        populate()       
        response = client.delete('/api/teamName/stories/1/details')
        self.assertEqual(response.status_code, 204)

class TagDetailsTests(TestCase):    
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/teamName/tag-details/([0-9]*)$ returns status code 200
        """
        populate()
        response = client.get('/api/teamName/tag-details/0')
        self.assertEqual(response.status_code, 200)


    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/teamName/tag-details/0')
                
        expected_data = {'id': 0, 'tag_id': 'error', 'team_id': '0', 'title': 'Test tag', 'description': 'A tag used for testing', 'colour': 'ffffff'}
        self.assertEqual(response.data, expected_data)

    def test_bad_GET_request(self):
        populate()
        response = client.get('/api/teamName/tag-details/101')
        
        self.assertEqual(response.status_code, 404)

    def test_add_tag_PUT_request_returns_201(self):
        """
        Check if the PUT request on /api/teamName/tag-details/1 returns status code 201
        """
        tag = {
            'tag_id': '0',
            'team_id': '0000',
            'title': 'Test tag',
            'description': "A tag used for testing",
            'colour': 'ffffff'
        }
        

        populate()       
        response = client.put('/api/teamName/tag-details/0', data=tag,  content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_bad_add_tag_PUT_request_returns_400(self):
        """
        Check if the bad PUT request on /api/teamName/tag-details/0 returns status code 400
        """
        tag = {
            'tag_id': '0',
            'team_id': '0000',
            'title': 'Bad Test tag',
        }
        
        populate()       
        response = client.put('/api/teamName/tag-details/0', data=tag,  content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_add_tag_DELETE_request_returns_204(self):
        """
        Check if the DELETE request on /api/teamName/tag-details/0 returns status code 204
        """

        populate()       
        response = client.delete('/api/teamName/tag-details/0')
        self.assertEqual(response.status_code, 204)

class ValueDetailsTests(TestCase):    
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/teamName/value-details/([0-9]*)$ returns status code 200
        """
        populate()
        response = client.get('/api/teamName/value-details/0')
        self.assertEqual(response.status_code, 200)


    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/teamName/value-details/0')
        
        expected_data = {'id': 0, 'tag_id': 'error', 'team_id': '0', 'title': 'Test value tag', 'description': 'A value tag used for testing', 'sub_values': [], 'colour': '9fdddf'}
        self.assertEqual(response.data, expected_data)

    def test_bad_GET_request(self):
        populate()
        response = client.get('/api/teamName/value-details/101')
        
        self.assertEqual(response.status_code, 404)

    def test_add_value_PUT_request_returns_201(self):
        """
        Check if the PUT request on /api/teamName/value-details/1 returns status code 201
        """
        value = {
            'tag_id': '0',
            'team_id': '0000',
            'title': 'Test value tag',
            'description': "A value tag used for testing",
            'sub_values': [],
            'colour': '9fdddf'
        }
        

        populate()       
        response = client.put('/api/teamName/value-details/0', data=value,  content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_bad_add_value_PUT_request_returns_400(self):
        """
        Check if the bad PUT request on /api/teamName/value-details/0 returns status code 400
        """
        value = {
            'tag_id': '0',
            'team_id': '0000',
            'title': 'Bad Test value',
        }
        
        populate()       
        response = client.put('/api/teamName/value-details/0', data=value,  content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_add_value_DELETE_request_returns_204(self):
        """
        Check if the DELETE request on /api/teamName/value-details/0 returns status code 204
        """

        populate()       
        response = client.delete('/api/teamName/value-details/0')
        self.assertEqual(response.status_code, 204)

class ColumnDetailsTests(TestCase):    
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/teamName/column-details/([0-9]*)$ returns status code 200
        """
        populate()
        response = client.get('/api/teamName/column-details/0')
        self.assertEqual(response.status_code, 200)


    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/teamName/column-details/0')
        
        expected_data = {'id': 0, 'column_id': 'error', 'dashboard_id': 'error', 'team_id': '0', 'title': 'Backlog', 'mark_as_complete': False, 'stories': [], 'story_list': '', 'WIP': 10}
        self.assertEqual(response.data, expected_data)

    def test_bad_GET_request(self):
        populate()
        response = client.get('/api/teamName/column-details/101')
        
        self.assertEqual(response.status_code, 404)

    def test_add_column_PUT_request_returns_201(self):
        """
        Check if the PUT request on /api/teamName/column-details/1 returns status code 201
        """
        column = {
            'column_id': '0',
            'team_id': '0000',
            'team_id': '0000',
            'title': 'Backlog',
            'mark_as_complete': False,
            'stories': [],
            'WIP': 10
        }
        

        populate()       
        response = client.put('/api/teamName/column-details/0', data=column,  content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_bad_add_column_PUT_request_returns_400(self):
        """
        Check if the bad PUT request on /api/teamName/column-details/0 returns status code 400
        """
        column = {
            'column_id': '0',
            'team_id': '0000',
            'team_id': '0000',
        }
        
        populate()       
        response = client.put('/api/teamName/column-details/0', data=column,  content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_add_column_DELETE_request_returns_204(self):
        """
        Check if the DELETE request on /api/teamName/column-details/0 returns status code 204
        """

        populate()       
        response = client.delete('/api/teamName/column-details/0')
        self.assertEqual(response.status_code, 204)

class UserDetailsTests(TestCase):    
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/user-details/1 returns status code 200
        """
        populate()
        response = client.get('/api/user-details/1')
        self.assertEqual(response.status_code, 200)


    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/user-details/1')
    
        #jfrog-ignore
        expected_data = {'id': 1, 'belongs_to': 2, 'username': 'naimhgilndsl', 'password': 'passwrod123!', 'email': 'fake@email.com', 'first_name': 'Niamh', 'surname': 'Gillespie', 'role': 'error', 'teams': [], 'profile_photo': None}
        self.assertEqual(response.data, expected_data)

    def test_bad_GET_request(self):
        populate()
        response = client.get('/api/user-details/101')
        
        self.assertEqual(response.status_code, 404)

    def test_add_column_PUT_request_returns_201(self):
        """
        Check if the PUT request on /api/user-details/1 returns status code 201
        """
        user = {
            'user_id': '1',
            'first_name': 'Niamh 2',
            'email': 'fake@email.com',
            'password': 'newPassword'
        }

        populate()       
        response = client.put('/api/user-details/1', data=user,  content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_bad_add_column_PUT_request_returns_400(self):
        """
        Check if the bad PUT request on /api/user-details/1 returns status code 400
        """
        user = {
            'profile_photo': 0,
        }

        populate()       
        response = client.put('/api/user-details/1', data=user, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_add_column_DELETE_request_returns_204(self):
        """
        Check if the DELETE request on /api/user-details/1 returns status code 204
        """

        populate()       
        response = client.delete('/api/user-details/1')
        self.assertEqual(response.status_code, 204)

class TeamDetailsTests(TestCase):    
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/team-details/0$ returns status code 200
        """
        populate()
        response = client.get('/api/team-details/0')
        self.assertEqual(response.status_code, 200)


    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/team-details/0')
    
        expected_data = {'id': 0, 'belongs_to': 2, 'team_name': 'error', 'team_photo': None, 'team_leads': [], 'team_members': []}
        self.assertEqual(response.data, expected_data)

    def test_bad_GET_request(self):
        populate()
        response = client.get('/api/team-details/101')
        
        self.assertEqual(response.status_code, 404)

    def test_add_column_PUT_request_returns_201(self):
        """
        Check if the PUT request on /api/team-details/0 returns status code 201
        """
        team = {
            'team_id': '1',
            'team_name': 'New Team',
        }

        populate()       
        response = client.put('/api/team-details/0', data=team,  content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_bad_add_column_PUT_request_returns_400(self):
        """
        Check if the bad PUT request on /api/team-details/0 returns status code 400
        """
        team = {
            'team_photo': 0,
        }

        populate()       
        response = client.put('/api/team-details/0', data=team,  content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_add_column_DELETE_request_returns_204(self):
        """
        Check if the DELETE request on /api/team-details/0 returns status code 204
        """

        populate()       
        response = client.delete('/api/team-details/0')
        self.assertEqual(response.status_code, 204)

class UserDetailsByUsernameTests(TestCase):    
    def test_GET_request_returns_200(self):
        """
        Check if the GET request on /api/user-details-by-username/naimhgilndsl$ returns status code 200
        """
        populate()
        response = client.get('/api/user-details-by-username/naimhgilndsl')
        self.assertEqual(response.status_code, 200)


    def test_GET_request_expected_data(self):
        populate()
        response = client.get('/api/user-details-by-username/naimhgilndsl')
        #jfrog-ignore
        expected_data = {'id': 1, 'belongs_to': 2, 'username': 'naimhgilndsl', 'password': 'passwrod123!', 'email': 'fake@email.com', 'first_name': 'Niamh', 'surname': 'Gillespie', 'role': 'error', 'teams': [], 'profile_photo': None}
        self.assertEqual(response.data, expected_data)

    def test_bad_GET_request(self):
        populate()
        response = client.get('/api/user-details-by-username/dontexist')
        
        self.assertEqual(response.status_code, 404)

    def test_add_column_PUT_request_returns_201(self):
        """
        Check if the PUT request on /api/user-details-by-username/naimhgilndsl returns status code 201
        """
        user = {
            'first_name': "niamhhh",
            'password': 'new password',
            'email': 'fake@email.com'
        }

        populate()       
        response = client.put('/api/user-details-by-username/naimhgilndsl', data=user,  content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_bad_add_column_PUT_request_returns_400(self):
        """
        Check if the bad PUT request on /api/user-details-by-username/naimhgilndsl returns status code 400
        """
        user = {
            'profile_photo': 0,
        }

        populate()       
        response = client.put('/api/user-details-by-username/naimhgilndsl', data=user,  content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_add_column_DELETE_request_returns_204(self):
        """
        Check if the DELETE request on /api/user-details-by-username/naimhgilndsl returns status code 204
        """

        populate()       
        response = client.delete('/api/user-details-by-username/naimhgilndsl')
        self.assertEqual(response.status_code, 204)

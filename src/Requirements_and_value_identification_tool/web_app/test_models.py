from django.test import TestCase, Client
from web_app.models import *
from datetime import date, timedelta

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
        self.assertEqual(str(epic), 'Test Epic Title')

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
        self.assertEqual(str(story), 'Test Story Title')

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
        self.assertEqual(str(tag), 'Test Tag Title')

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
        self.assertEqual(str(value), 'Test Tag Title')

        self.assertEqual(value.tag_id, '0')
        self.assertEqual(value.team_id, '0000')
        self.assertEqual(value.title, 'Test Tag Title')
        self.assertEqual(value.description, 'description...')
        self.assertEqual(value.colour, 'ffffff')

class TrackingColumnCreationTests(TestCase):
    def test__tracking_column_created(self):
        """
        Checks to make sure that when a TrackingColumn is created, the correct information is added.
        """
        column = TrackingColumn(
                id = 0,
                column_id = '0',
                dashboard_id = '0000',
                team_id = '0001',
                title = 'Test Tracking Column',
                mark_as_complete = False,
                story_list = '',
                WIP = 5,
            )
        column.stories.set([])
        column.save()
        self.assertEqual(str(column), 'Test Tracking Column')

        self.assertEqual(column.column_id, '0')
        self.assertEqual(column.dashboard_id, '0000')
        self.assertEqual(column.team_id, '0001')
        self.assertEqual(column.title, 'Test Tracking Column')
        self.assertEqual(column.mark_as_complete, False)
        self.assertEqual(str(column.stories), 'web_app.Story.None')
        self.assertEqual(column.story_list, '')
        self.assertEqual(column.WIP, 5)

class SprintCreationTests(TestCase):
    def test__sprint_created(self):
        """
        Checks to make sure that when a Sprint is created, the correct information is added.
        """
        sprint = Sprint(
            id = 0,
            sprint_id = '0',
            dashboard_id = '0000',
            start_date = date.today(),
            end_date = date.today(),
            story_list = ''
            )
        sprint.stories.set([])
        sprint.save()
        self.assertEqual(str(sprint), '0')

        self.assertEqual(sprint.id, 0)
        self.assertEqual(sprint.sprint_id, '0')
        self.assertEqual(sprint.dashboard_id, '0000')
        self.assertEqual(sprint.start_date, date.today())
        self.assertEqual(sprint.end_date, date.today())
        self.assertEqual(str(sprint.stories), 'web_app.Story.None')
        self.assertEqual(sprint.story_list, '')

    def test__sprint_current(self):
        """
        Checks to make sure that a current sprint is correctly defined as current.
        """
        sprint = Sprint(
            id = 0,
            sprint_id = '0',
            dashboard_id = '0000',
            start_date = str(date.today()),
            end_date = str(date.today() + timedelta(2)),
            story_list = ''
            )
        sprint.stories.set([])
        sprint.save()
        self.assertEqual(sprint.is_current(), True)

    def test__sprint_not_current(self):
        """
        Checks to make sure that a non current sprint is correctly defined as not being current.
        """
        sprint = Sprint(
            id = 0,
            sprint_id = '0',
            dashboard_id = '0000',
            start_date = str(date.today() - timedelta(10)),
            end_date = str(date.today() - timedelta(2)),
            story_list = ''
            )
        sprint.stories.set([])
        sprint.save()
        self.assertEqual(sprint.is_current(), False)

class OrganisationCreationTests(TestCase):
    def test_organisation_created(self):
        """
        Checks to make sure that when an organisation is created, the correct information is added.
        """
        org = Organisation(
            id = 0,
            name = 'University of Glasgow',
            )
        org.teams.set([])
        org.users.set([])
        org.save()
        
        self.assertEqual(str(org), 'University of Glasgow')

        self.assertEqual(org.id, 0)
        self.assertEqual(org.name, 'University of Glasgow')
        self.assertEqual(str(org.teams), 'web_app.Team.None')
        self.assertEqual(str(org.users), 'web_app.User.None')

class TeamCreationTests(TestCase):
    def test_team_created(self):
        """
        Checks to make sure that when an team is created, the correct information is added.
        """
        team = Team(
            id = 0,
            name = 'Team Name',
            picture = '',
            )
        team.team_members.set([])
        team.save()
        
        self.assertEqual(str(team), 'Team Name')

        self.assertEqual(team.id, 0)
        self.assertEqual(team.name, 'Team Name')
        self.assertEqual(team.picture, '')
        self.assertEqual(str(team.team_members), 'web_app.User.None')
        
class UserCreationTests(TestCase):
    def test_user_created(self):
        """
        Checks to make sure that when a user is created, the correct information is added.
        """
        #need for FK
        org = Organisation(
            id = 0,
            name = 'University of Glasgow',
            )
        org.teams.set([])
        org.users.set([])
        org.save()

        user = User(
            id = 0,
            username = 'NiamhG',
            first_name = 'Niamh',
            surname = 'Gillespie',
            role = 'team_member',
            belongs_to = org
            )
        user.teams.set([])
        user.save()
        
        self.assertEqual(str(user), 'NiamhG')

        self.assertEqual(user.id, 0)
        self.assertEqual(user.username, 'NiamhG')
        self.assertEqual(user.first_name, 'Niamh')
        self.assertEqual(user.surname, 'Gillespie')
        self.assertEqual(user.role, 'team_member')
        self.assertEqual(user.belongs_to, org)
        self.assertEqual(str(user.teams), 'web_app.Team.None')

    
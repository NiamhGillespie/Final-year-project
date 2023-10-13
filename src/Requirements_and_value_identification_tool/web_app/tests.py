from django.test import TestCase
from web_app.models import Epic, Story
from datetime import date

class EpicCreationTests(TestCase):
    def test_epic_id_created(self):
        """
        Checks to make sure that when an Epic is created, the correct epic_id is added.
        """
        epic = Epic(
                epic_id = '0',
                dashboard_id = '0',
                title = 'Test Epic Title',
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
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        epic.save()
        self.assertEqual(epic.title, 'Test Epic Title')

    def test_last_edited_by_field_created(self):
        """
        Checks to make sure that when an Epic is created, the correct last_edited_by is added.
        """
        epic = Epic(
                epic_id = '0',
                dashboard_id = '0',
                title = 'Test Epic Title',
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
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                value_statement = 'ensures functional requirements of code are met',
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
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                value_statement = 'ensures functional requirements of code are met',
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
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                value_statement = 'ensures functional requirements of code are met',
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

    def test_user_story_created(self):
        """
        Checks to make sure that when a Story is created, the correct user_story is added.
        """
        story = Story(
                story_id = '0',
                epic_id = '1',
                title = 'Test Story Title',
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                value_statement = 'ensures functional requirements of code are met',
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
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                value_statement = 'ensures functional requirements of code are met',
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

    def test_value_statement_created(self):
        """
        Checks to make sure that when a Story is created, the correct value_statement is added.
        """
        story = Story(
                story_id = '0',
                epic_id = '1',
                title = 'Test Story Title',
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                value_statement = 'ensures functional requirements of code are met',
                priority = 'MEDIUM',
                pairable = False,
                assigned_to = 'Niamh Gillespie',
                last_edited_by = 'Niamh Gillespie',
                last_edited = date.today(),
                created_by = 'Niamh Gillespie',
                time_created = date.today()
            )
        story.save()
        self.assertEqual(story.value_statement, 'ensures functional requirements of code are met')
    
    def test_priority_created(self):
        """
        Checks to make sure that when a Story is created, the correct priority is added.
        """
        story = Story(
                story_id = '0',
                epic_id = '1',
                title = 'Test Story Title',
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                value_statement = 'ensures functional requirements of code are met',
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
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                value_statement = 'ensures functional requirements of code are met',
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
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                value_statement = 'ensures functional requirements of code are met',
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
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                value_statement = 'ensures functional requirements of code are met',
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
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                value_statement = 'ensures functional requirements of code are met',
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
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                value_statement = 'ensures functional requirements of code are met',
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
                user_story = 'As a developer, I want to create unit tests, So that I can continously integrate my code',
                definition_of_done = 'Set up a unit test suite',
                value_statement = 'ensures functional requirements of code are met',
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
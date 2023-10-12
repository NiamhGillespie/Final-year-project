from django.test import TestCase
from web_app.models import Epic, Story
from datetime import date

class EpicCreationTests(TestCase):
    def test_epic_id_created(self):
        """
        Checks to make sure that when an Epic is created, the correct epic_id is added.
        Example: epic_id should be "0".
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
        Example: dashboard_id should be "0".
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
        Example: title should be "Test Epic Title".
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
        Example: last_edited_by should be "Niamh Gillespie".
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
        Example: last_edited should be todays date.
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
        Example: created_by should be todays date.
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
        Example: time_created should be todays date.
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
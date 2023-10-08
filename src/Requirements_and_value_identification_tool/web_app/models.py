from django.db import models
from datetime import datetime

# Create your models here.
class Epic(models.Model):
    epic_id = models.CharField(max_length=8) #8 digits specific only - constrain this
    epic_colour = models.CharField(max_length=20)
    dashboard_id = models.CharField(max_length=8) #this will be a foreign key
    title = models.CharField(max_length=128)

    last_edited_by = models.CharField(max_length=128)
    last_edited =  models.CharField(max_length=128)
    created_by = models.CharField(max_length=128)
    time_created = models.CharField(max_length=128)

    def __str__(self):
        return self.title

class Story(models.Model):
    story_id = models.CharField(max_length=8) #8 digits specific?
    epic_id = models.CharField(max_length=8) #maybe foreign key #each story corresponds to only one epic
    title = models.CharField(max_length=128)
    

    user_story = models.CharField(max_length=1028) #Trefine this number at later date
    definition_of_done = models.CharField(max_length=1028)
    value_statement = models.CharField(max_length=1028)

    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    priority = models.CharField(max_length=6, choices = [(LOW, "low priority"), (MEDIUM, "medium priority"), (HIGH, "high priority")])

    #user defined tag list?
    #state variable - based on issue board (e.g backlog, in progress, complete <- these may be defined by user)
    #linked/dependent stories

    pairable = models.BooleanField(default = False)
    assigned_to = models.CharField(max_length=128) #this should be list of users in future

    last_edited_by = models.CharField(max_length=128)
    last_edited =  models.CharField(max_length=128)
    created_by = models.CharField(max_length=128)
    time_created = models.CharField(max_length=128)
    

    def __str__(self):
        return self.title

class Task(models.Model):
    task_id = models.CharField(max_length=8) #8 digits specific?
    story_id = models.CharField(max_length=8) #maybe foreign key #each task corresponds to only one story
    title = models.CharField(max_length=128)

    #look into literature surrounding 'good' task habits
    description = models.CharField(max_length=1028)

    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    priority = models.CharField(max_length=6, choices = [(LOW, "low priority"), (MEDIUM, "medium priority"), (HIGH, "high priority")])

    #repeated from story class
    #user defined tags
    #state variable

    pairable = models.BooleanField()
    assigned_to = models.CharField(max_length=128) #this should be list of users in future

    last_edited_by = models.CharField(max_length=128)
    last_edited = models.DateTimeField(default=datetime(2023, 10, 3, 15))
    created_by = models.CharField(max_length=128)
    time_created = models.DateTimeField(default=datetime(2023, 10, 3, 15))

    def __str__(self):
        return self.title

#will have multiple dashboards how to refine
#each dashboard has multiple epics
#each epic has only one dashboard
#each epic has multiple stories
#a story only has one epic
#each story can have multiple tasks
#each task can only have one story 

#consider moving logging info into own class?
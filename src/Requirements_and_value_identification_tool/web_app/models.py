from django.db import models
from datetime import date, datetime

# Create your models here.

class Tag(models.Model):
    tag_id = models.CharField(max_length=8, default='error')
    team_id = models.CharField(max_length=8, default='error')
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
    colour = models.CharField(max_length=6)

    def __str__(self):
        return self.title

class ValueTag(models.Model):
    tag_id = models.CharField(max_length=8, default='error')
    team_id = models.CharField(max_length=8, default='error')
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=128)
    sub_values = models.ManyToManyField("self", blank=True, default=[])
    colour = models.CharField(max_length=6)

    def __str__(self):
        return self.title

class Epic(models.Model):
    epic_id = models.CharField(max_length=8) #8 digits specific only - constrain this
    epic_colour = models.CharField(max_length=6)
    dashboard_id = models.CharField(max_length=8) #this will be a foreign key
    title = models.CharField(max_length=128)

    order = models.IntegerField(default=-1)
    tags = models.ManyToManyField(Tag, blank=True)
    values = models.ManyToManyField(ValueTag, blank=True)

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

    order = models.IntegerField(default=-1)
    tags = models.ManyToManyField(Tag, blank=True)
    

    user_story = models.CharField(max_length=1028) #Trefine this number at later date
    definition_of_done = models.CharField(max_length=1028)
    values = models.ManyToManyField(ValueTag, blank=True)

    story_points = models.CharField(max_length=10, default='N/A')

    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    priority = models.CharField(max_length=6, choices = [(LOW, "low priority"), (MEDIUM, "medium priority"), (HIGH, "high priority")])

    pairable = models.BooleanField(default = False)
    assigned_to = models.CharField(max_length=128) #this should be list of users in future

    state = models.CharField(max_length=128, default='undefined')

    last_edited_by = models.CharField(max_length=128)
    last_edited =  models.CharField(max_length=128)
    created_by = models.CharField(max_length=128)
    time_created = models.CharField(max_length=128)
    

    def __str__(self):
        return self.title

class TrackingColumn(models.Model):
    column_id = models.CharField(max_length=8, default='error')
    dashboard_id = models.CharField(max_length=8, default='error')
    team_id = models.CharField(max_length=8, default='error')
    title = models.CharField(max_length=30)
    mark_as_complete = models.BooleanField(default = False)
    stories = models.ManyToManyField(Story, blank=True, default=[])
    story_list = models.CharField(max_length=128, blank=True)
    WIP = models.IntegerField(blank = True, default=0)

    def __str__(self):
        return self.title

class Sprint(models.Model):
    sprint_id = models.CharField(max_length=8, default='error')
    dashboard_id = models.CharField(max_length=8, default='error')
    start_date = models.CharField(max_length=1024, default='error')
    end_date = models.CharField(max_length=1024, default='error')
    stories = models.ManyToManyField(Story, blank=True, default=[])
    story_list = models.CharField(max_length=128, blank=True)

    def __str__(self):
        return self.sprint_id
    
    def is_current(self):
        start_date = self.start_date[0:10]
        end_date = self.end_date[0:10]
        current_date = str(date.today())
        date_format = '%Y-%m-%d'

        formatted_start_date = datetime.strptime(start_date, date_format)
        formatted_end_date = datetime.strptime(end_date, date_format)
        formatted_current_date = datetime.strptime(current_date, date_format)

        if formatted_start_date <= formatted_current_date and formatted_end_date >= formatted_current_date:
            return True
        else:
            return False
        
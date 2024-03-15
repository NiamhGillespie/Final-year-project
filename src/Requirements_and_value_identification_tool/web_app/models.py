from django.db import models
from datetime import date, datetime


# Create your models here.

class Tag(models.Model):
    tag_id = models.CharField(max_length=8, default='error')
    team_id = models.CharField(max_length=8, default='error')
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=200, blank=True)
    colour = models.CharField(max_length=6)

    def __str__(self):
        return self.title

class ValueTag(models.Model):
    tag_id = models.CharField(max_length=8, default='error')
    team_id = models.CharField(max_length=8, default='error')
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=128, blank=True)
    sub_values = models.ManyToManyField("self", blank=True, default=[])
    colour = models.CharField(max_length=6)

    def __str__(self):
        return self.title

class Epic(models.Model):
    epic_id = models.CharField(max_length=8) #8 digits specific only - constrain this
    epic_colour = models.CharField(max_length=6)
    team_id = models.CharField(max_length=8) #this will be a foreign key
    title = models.CharField(max_length=128)

    order = models.IntegerField(default=-1)
    tags = models.ManyToManyField(Tag, blank=True)
    values = models.ManyToManyField(ValueTag, blank=True)

    completed = models.BooleanField(default = False)

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

    team_id = models.CharField(max_length=8) 

    order = models.IntegerField(default=-1)
    tags = models.ManyToManyField(Tag, blank=True)
    

    user_story = models.CharField(max_length=1028, blank=True) #Trefine this number at later date
    definition_of_done = models.CharField(max_length=1028, blank=True)
    values = models.ManyToManyField(ValueTag, blank=True)

    story_points = models.CharField(max_length=10, default='0')

    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    priority = models.CharField(max_length=6, choices = [(LOW, "low priority"), (MEDIUM, "medium priority"), (HIGH, "high priority")])

    pairable = models.BooleanField(default = False, blank=True)
    assigned_to = models.ManyToManyField("UserProfile", blank=True)

    state = models.CharField(max_length=128, default='undefined')
    completed = models.BooleanField(default = False)

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
    WIP = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

class Organisation(models.Model):
    name = models.CharField(max_length=128, default='error')
    teams = models.ManyToManyField("Team", blank=True)
    users = models.ManyToManyField("UserProfile", blank=True)

    def __str__(self):
        return self.name
    
class Team(models.Model):
    belongs_to = models.ForeignKey(Organisation, blank=True, null=True, on_delete=models.CASCADE)
    team_name = models.CharField(max_length=32, default='error')
    team_photo = models.ImageField(upload_to='team_images', blank=True)
    team_leads = models.ManyToManyField("UserProfile", related_name="team_leads", blank=True)
    team_members = models.ManyToManyField("UserProfile", related_name="team_members", blank=True)

    def __str__(self):
        return self.team_name 

class UserProfile(models.Model):
    belongs_to = models.ForeignKey(Organisation, blank=True, null=True, on_delete=models.CASCADE)
    username = models.CharField(max_length=32, default='error', unique=True)
    password = models.CharField(max_length=32, default='error')
    email = models.CharField(max_length=128, default='error')
    first_name = models.CharField(max_length=128, default='error')
    surname = models.CharField(max_length=128, default='error')
    role = models.CharField(max_length=32, default='error')
    teams = models.ManyToManyField(Team, blank=True)
    profile_photo = models.ImageField(upload_to='profile_images', blank=True)


    def __str__(self):
        return self.username
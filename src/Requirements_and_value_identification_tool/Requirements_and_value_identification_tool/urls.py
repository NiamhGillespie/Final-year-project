"""
URL configuration for Requirements_and_value_identification_tool project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.urls import include
from web_app import views

urlpatterns = [
    #will be done by react?
    #path('', views.home, name='home'),
    #path('home/', include('web_app.urls')),
    #path('home/teamName/epicsDashboard', views.getEpicDashboard, name='epicDashboard'),
    path('admin/', admin.site.urls),
    path('api/teamName/epicsDashboard', views.EpicDashboardInfo, name='epicDashboard'),
    re_path(r'^api/teamName/epics/([0-9]*)/details$', views.EpicDetails, name='epicDetails'),
    re_path(r'^api/teamName/stories/([0-9]*)/details$', views.StoryDetails, name='storyDetails'),

    #signup
    #profile
    #teams - will return list of teams 
    #teamName - will return details of team and links to issue and epic board
    #teamName/epicsDashboard
    #teamName/kanbanBoard
   
]

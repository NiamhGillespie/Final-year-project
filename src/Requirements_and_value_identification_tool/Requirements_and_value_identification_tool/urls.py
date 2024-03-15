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
from django.conf import settings 
from django.conf.urls.static import static
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    #will be done by react?
    #path('', views.home, name='home'),
    #path('home/', include('web_app.urls')),
    #path('home/teamName/epicsDashboard', views.getEpicDashboard, name='epicDashboard'),
    path('admin/', admin.site.urls),
    re_path(r'api/([0-9]*)/epicsDashboard', views.EpicDashboardInfo, name='epicDashboard'),
    re_path(r'^api/([0-9]*)/tags', views.TeamTags, name='teamTags'),
    re_path(r'^api/([0-9]*)/values', views.TeamValues, name='teamValues'),
    re_path(r'^api/([0-9]*)/tracking-columns', views.TeamTrackingColumns, name='teamTrackingColumns'),

    re_path(r'^api/teamName/epics/([0-9]*)/details$', views.EpicDetails, name='epicDetails'),
    re_path(r'^api/teamName/stories/([0-9]*)/details$', views.StoryDetails, name='storyDetails'),
    re_path(r'^api/teamName/tag-details/([0-9]*)$', views.TagDetail, name='tagDetails'),
    re_path(r'^api/teamName/value-details/([0-9]*)$', views.ValueDetail, name='valueDetails'),
    re_path(r'^api/teamName/column-details/([0-9]*)$', views.ColumnDetail, name='columnDetails'),
    re_path(r'^api/user-details/([0-9]*)$', views.UserDetails, name='userDetails'),
    re_path(r'^api/team-details/([0-9]*)$', views.TeamDetails, name='teamDetails'),
    re_path(r'^api/user-details-by-username/(.*)$', views.UserDetailsByUsername, name='userDetailsByUsername'),

    re_path(r'^api/organisations', views.Organisations, name='createOrganisation'),

    re_path(r'^api/([0-9]*)/admin/users$', views.Users, name='createUser'),
    re_path(r'^api/([0-9]*)/admin/teams$', views.Teams, name='createTeam'),

    re_path(r'^api/getUsernames', views.GetAllUsernames, name='getAllUsernames'),

    path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
     path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
    path('logout/', views.Logout.as_view(), name ='logout'),
   
]

if settings.DEBUG:  # new
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
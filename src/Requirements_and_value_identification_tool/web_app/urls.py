from django.urls import path
from web_app import views

app_name='tbc'

urlpatterns = [
    path('', views.home, name='home')
]

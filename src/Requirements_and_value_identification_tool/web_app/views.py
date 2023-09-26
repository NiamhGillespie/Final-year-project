from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    return render(request, 'web_app/home.html')


def getEpicDashboard(request):
    return render(request, 'web_app/epicDashboard.html')

def addEpic(request):
    return HttpResponse("boop")

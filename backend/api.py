from .models import User,  Company ,Profile
from rest_framework import viewsets ,permissions
from rest_framework.parsers import MultiPartParser , JSONParser
from .serializers import  CompanySerializer, ProfileSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from account.serializers import UserSerializer
from django.http import HttpResponse



class CompanyViewSet(viewsets.ModelViewSet):
    
    
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    
class ProfileViewSet(viewsets.ModelViewSet):


    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

@api_view(["GET"])
def get_six_jobs(request):
    try:
        queryset = Company.objects.all().order_by("-id")[:6]
    except Company.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == "GET":
        serializer = CompanySerializer(queryset, many=True)
        return Response(serializer.data)
@api_view(["GET"])
def get_six_profiles(request):
    try:
        queryset = Profile.objects.all().order_by("-id")[:6]
    except Profile.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == "GET":
        serializer = ProfileSerializer(queryset, many=True)
        return Response(serializer.data)

@api_view(["GET"])
def get_id(request, id):
    try:
        userid = User.objects.get(id=id)
        idi = userid.myprofile
    except User.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == "GET":
        serializer = ProfileSerializer(idi)
        return Response(serializer.data)

@api_view(["GET"])
def get_jobs_by_cat_with_country(request, name,country):
    try:
        jobsbycat = Company.objects.filter(category=name, country=country)
        
    except Company.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == "GET":
        serializer = CompanySerializer(jobsbycat , many=True)
        return Response(serializer.data)

@api_view(["GET"])
def get_jobs_by_cat_without_country(request, name):
    try:
        jobsbycat = Company.objects.filter(category=name)
        
    except Company.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == "GET":
        serializer = CompanySerializer(jobsbycat , many=True)
        return Response(serializer.data)

@api_view(["GET"])
def get_jobs_by_name(request, name):
    try:
        jobsbyname = Company.objects.filter(jobname=name)
        
    except Company.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == "GET":
        serializer = CompanySerializer(jobsbyname , many=True)
        return Response(serializer.data)

@api_view(["GET"])
def get_jobs_by_companyname(request, name):
    try:
        jobsbyname = Company.objects.filter(companyname=name)
        
    except Company.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == "GET":
        serializer = CompanySerializer(jobsbyname , many=True)
        return Response(serializer.data)

@api_view(["GET"])
def get_seekers_by_cat_with_country(request, name ,country):
    try:
        seekersbycat = Profile.objects.filter(category=name, livecountry=country)
        
    except Profile.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == "GET":
        serializer = ProfileSerializer(seekersbycat , many=True)
        return Response(serializer.data)

@api_view(["GET"])
def get_seekers_by_cat_without_country(request, name):
    try:
        seekersbycat = Profile.objects.filter(category=name)
        
    except Profile.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == "GET":
        serializer = ProfileSerializer(seekersbycat , many=True)
        return Response(serializer.data)


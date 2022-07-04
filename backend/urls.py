from unicodedata import name

from django.urls import path
from rest_framework import routers

from .api import (CompanyViewSet, ProfileViewSet, get_id,
                  get_jobs_by_cat_with_country,
                  get_jobs_by_cat_without_country,
                  get_jobs_by_name,
                  get_seekers_by_cat_with_country,
                  get_seekers_by_cat_without_country,
                  get_jobs_by_companyname,
                  get_six_jobs,
                  get_six_profiles)

router = routers.DefaultRouter()
router.register('api/companies', CompanyViewSet, basename='companies')
router.register('api/profiles', ProfileViewSet, 'profiles')

urlpatterns = [
    path("api/getid/<int:id>", get_id , name='getid'),

    path("api/getjobs/<str:name>/<str:country>", get_jobs_by_cat_with_country , name='getjobscountry'),
    path("api/getjobs/<str:name>", get_jobs_by_cat_without_country , name='getjobs'),
    path("api/getjobsglobal/<str:name>", get_jobs_by_name , name='getjobsname'),
    path("api/getjobscompany/<str:name>", get_jobs_by_companyname , name='getjobscompany'),
    
    path("api/getseekers/<str:name>/<str:country>", get_seekers_by_cat_with_country , name='getseekerscountry'),
    path("api/getseekers/<str:name>", get_seekers_by_cat_without_country , name='getseekers'),

    path("api/getsixjobs/", get_six_jobs, name="sixjobs"),
    path("api/getsixprofiles/", get_six_profiles, name="sixprofiles"),
    
]
urlpatterns += router.urls

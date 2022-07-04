from rest_framework.test import APITestCase
from django.urls import reverse
from django.test import TestCase
from backend.models import Company, Profile
from django.contrib.auth.models import User

class TestSetUp(TestCase):
    
    def setUp(self):
        self.register_url = reverse('register')
        self.company_url = 'api/companies/'
        
        us1 = User.objects.create(username="etar",email="bbhmed@gmail.com",password="email1")
        
        company = Company.objects.create(companyname="bbhCompany",jobname="bbh",category="Energy")
        return super().setUp()


    def tearDown(self):
        return super().tearDown()
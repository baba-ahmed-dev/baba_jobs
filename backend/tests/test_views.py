from ast import arg
from django.urls import reverse
from django.contrib.auth.models import User
from backend.models import Company , Profile
from rest_framework import status
from rest_framework.response import Response
from rest_framework.test import APITestCase


class TestViews(APITestCase):
    
    def setUp(self):
       self.register_url = reverse('register')
       self.us1 = User.objects.create(username="etar",email="bbhmed@gmail.com",password="email1")
       
        # create user1 for test
       self.user1 = User.objects.create(username="bbhmed",password="1234cs50")
       # create user2 for test
       self.user2 = User.objects.create(username="sidi",password="1234cs50")
       self.comp = Company.objects.create(companyname="Edx", jobname="python", category="computer",country="usa")

    def test_create_company(self):
        """ test POST a comppany """
        data={
        "companyname": "cs50",
        "jobname": "job",
        "category": "computer"
        }
        response = self.client.post('/api/companies/', {"companyname": "cs50","jobname": "job","category": "computer"}, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_company(self):
        """ test GET a company by id"""
        response = self.client.get('/api/companies/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["companyname"],"Edx")
        self.assertEqual(response.data["id"],1)

    def test_put_company(self):
        """ test PUT a company by id"""
        response = self.client.put('/api/companies/1/', data={
            "companyname": "cs50",
            "jobname": "job",
            "category": "computer"
            })
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_company(self):
        """ test DELETE a company by id"""
        response = self.client.delete('/api/companies/1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_getsix_jobs(self):
        """ test get six jobs """
        response = self.client.get(reverse('sixjobs'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_getsix_profiles(self):
        """ test get six profiles """
        response = self.client.get(reverse('sixprofiles'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_getuser_id(self):
        """ test get user id func """
        response = self.client.get(reverse('getid', args=[1]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_getjob_by_cat_without_country(self):
        """ test get job by cat without country """
        response = self.client.get(reverse('getjobs', args=["computer"]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_getjob_by_cat_with_country(self):
        """ test get job by cat with cuntry"""
        response = self.client.get(reverse('getjobscountry', args=["computer","usa"]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_getjob_by_name(self):
        """ test get job by name """
        response = self.client.get(reverse('getjobsname', args=["job"]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_getjob_by_company_name(self):
        """ test get job by company name"""
        response = self.client.get(reverse('getjobscompany', args=["cs50"]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_getseeker_by_cat_without_country(self):
        """ test get seeker by cat without country """
        response = self.client.get(reverse('getseekers', args=["computer"]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_getseeker_by_cat_with_country(self):
        """ test get seeker by cat with cuntry"""
        response = self.client.get(reverse('getseekerscountry', args=["computer","usa"]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
from backend.models import Company, Profile
from django.contrib.auth.models import User
from .test_setUp import TestSetUp


class TestModels(TestSetUp):
    
    def test_create_user_profile(self):
        """assert that func create a profile automatic when a user created"""
        self.usr_data = { 
            'username':'baba',
            'email':'baba@baba.com',
            'password':'baba2022',
        }
        self.client.post(self.register_url, self.usr_data, format="json")
        self.usr = User.objects.get(username="baba")
        profile = Profile.objects.get(user=self.usr)
        self.assertTrue(profile)

    def test_profile_names_label(self):
        """assert that profile label working well"""
        res = Profile.objects.get(pk=1)
        f_labelcat = res._meta.get_field('category').verbose_name
        f_labeluser = res._meta.get_field('user').verbose_name
        f_labelimg = res._meta.get_field('img').verbose_name
        f_labelbackProf = res._meta.get_field('backProf').verbose_name
        f_labellivecountry = res._meta.get_field('livecountry').verbose_name
        f_labelbirthcountry = res._meta.get_field('birthcountry').verbose_name
        f_labeldatebirth = res._meta.get_field('datebirth').verbose_name
        f_labelemailcontact = res._meta.get_field('emailcontact').verbose_name
        f_labelnumbercontact = res._meta.get_field('numbercontact').verbose_name
        f_labeldescription = res._meta.get_field('description').verbose_name
        f_labelexpone = res._meta.get_field('expone').verbose_name
        f_labelexptwo = res._meta.get_field('exptwo').verbose_name
        f_labelexpthree = res._meta.get_field('expthree').verbose_name
        f_labeldegone = res._meta.get_field('degone').verbose_name
        f_labeldegtwo = res._meta.get_field('degtwo').verbose_name
        f_labeldegthree = res._meta.get_field('degthree').verbose_name
        f_labeljoined = res._meta.get_field('joined').verbose_name
        f_labeldeactive = res._meta.get_field('deactive').verbose_name
        self.assertEqual(f_labelcat,'category')
        self.assertEqual(f_labeluser,'user')
        self.assertEqual(f_labelimg,'img')
        self.assertEqual(f_labelbackProf,'backProf')
        self.assertEqual(f_labellivecountry,'livecountry')
        self.assertEqual(f_labelbirthcountry,'birthcountry')
        self.assertEqual(f_labeldatebirth,'datebirth')
        self.assertEqual(f_labelemailcontact,'emailcontact')
        self.assertEqual(f_labelnumbercontact,'numbercontact')
        self.assertEqual(f_labeldescription,'description')
        self.assertEqual(f_labelexpone,'expone')
        self.assertEqual(f_labelexptwo,'exptwo')
        self.assertEqual(f_labelexpthree,'expthree')
        self.assertEqual(f_labeldegone,'degone')
        self.assertEqual(f_labeldegtwo,'degtwo')
        self.assertEqual(f_labeldegthree,'degthree')
        self.assertEqual(f_labeljoined,'joined')
        self.assertEqual(f_labeldeactive,'deactive')

    def test_profile_str(self):
        """assert that profile str method working well"""
        res = Profile.objects.get(pk=1)
        self.assertEqual(str(res),"etar")

    
    def test_company_str(self):
        """assert that company str method working well"""
        res = Company.objects.create(companyname="Edx",jobname="develloper",category="Energy")
        self.assertEqual(str(res),"develloper")

    def test_company_names_label(self):
        """assert that company label names working well"""
        
        res = Company.objects.get(pk=1)
        f_labelcompanyname = res._meta.get_field('companyname').verbose_name
        f_labeljobname = res._meta.get_field('jobname').verbose_name
        f_labelcountry = res._meta.get_field('country').verbose_name
        f_labelcategory = res._meta.get_field('category').verbose_name
        f_labelimage = res._meta.get_field('image').verbose_name
        f_labelemailcontact = res._meta.get_field('emailcontact').verbose_name
        f_labelnumbercontact = res._meta.get_field('numbercontact').verbose_name
        f_labeldesc = res._meta.get_field('desc').verbose_name
        f_labelstartin = res._meta.get_field('startin').verbose_name
        f_labelendin = res._meta.get_field('endin').verbose_name
        f_labelcreated = res._meta.get_field('created').verbose_name
        f_labeldeactive = res._meta.get_field('deactive').verbose_name
        self.assertEqual(f_labelcompanyname,'companyname')
        self.assertEqual(f_labeljobname,'jobname')
        self.assertEqual(f_labelcountry,'country')
        self.assertEqual(f_labelcategory,'category')
        self.assertEqual(f_labelimage,'image')
        self.assertEqual(f_labelemailcontact,'emailcontact')
        self.assertEqual(f_labelnumbercontact,'numbercontact')
        self.assertEqual(f_labeldesc,'desc')
        self.assertEqual(f_labelstartin,'startin')
        self.assertEqual(f_labelendin,'endin')
        self.assertEqual(f_labelcreated,'created')
        self.assertEqual(f_labeldeactive,'deactive')
    
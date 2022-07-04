import django
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone



class Company(models.Model):
    companyname = models.CharField(max_length=100)
    jobname = models.CharField(max_length=100)
    country = models.CharField(max_length=100 , null=True ,blank=True)
    category = models.CharField(max_length=100, null=True ,blank=True)
    image = models.ImageField(upload_to="photos%d%y%m",default="default-logo.png", null=True , blank=True)
    emailcontact = models.EmailField(max_length=100  ,null=True , blank=True )
    numbercontact = models.BigIntegerField(null=True , blank=True )
    desc = models.CharField(max_length=500, blank=True)
    startin = models.DateField(null=True, blank=True)
    endin = models.DateField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    deactive = models.BooleanField(default=False)


    def __str__(self):
        return str(self.jobname)



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True , related_name="myprofile" )
    category = models.CharField(max_length=100, null=True ,blank=True)
    backProf = models.ImageField(upload_to="photos%d%y%m", default="def-profile.png",null=True , blank=True)
    img = models.ImageField(upload_to="photos%d%y%m", default="def-profile.png",null=True , blank=True)
    livecountry = models.CharField(max_length=100 , null=True, blank=True)
    birthcountry = models.CharField(max_length=100 , null=True, blank=True)
    datebirth = models.DateField(null=True, blank=True)
    emailcontact = models.EmailField(max_length=100  ,null=True , blank=True )
    numbercontact = models.BigIntegerField(null=True , blank=True )
    description = models.TextField(max_length=1000 , null=True, blank=True)
    expone = models.CharField(max_length=100, null=True, blank=True)
    exptwo = models.CharField(max_length=100, null=True, blank=True)
    expthree = models.CharField(max_length=100, null=True, blank=True)
    degone = models.ImageField(upload_to="photos%d%y%m", default="def-img.png",null=True , blank=True)
    degtwo = models.ImageField(upload_to="photos%d%y%m", default="def-img.png",null=True , blank=True)
    degthree = models.ImageField(upload_to="photos%d%y%m", default="def-img.png",null=True , blank=True)
    joined = models.DateTimeField(default=timezone.now)
    deactive = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.user)

@receiver(post_save, sender=User)
def create_user_profile(sender,instance,created, **kwargs):
    if created:
        Profile.objects.create(
            user=instance
        )
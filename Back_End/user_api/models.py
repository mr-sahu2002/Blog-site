from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from PIL import Image

class AppUserManager(BaseUserManager):
	def create_user(self, email, password=None,**extra_fields):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email,**extra_fields)
		user.set_password(password)
		user.save()
		return user
	
	def create_superuser(self, email, password=None, **extra_fields):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(email, password,**extra_fields)
		user.is_admin=True
		user.save()
		return user

class AppUser(AbstractBaseUser, PermissionsMixin):
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	username = models.CharField(max_length=50)
	
	is_active = models.BooleanField(default=True)
	is_admin = models.BooleanField(default=False)

	objects = AppUserManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']

	def __str__(self):
		return self.username
	
	def has_perm(self, perm, obj=None):
		"Does the user have a specific permission?"
		# Simplest possible answer: Yes, always
		return True

	def has_module_perms(self, app_label):
		"Does the user have permissions to view the app `app_label`?"
		# Simplest possible answer: Yes, always
		return True

	@property
	def is_staff(self):
		"Is the user a member of staff?"
		# Simplest possible answer: All admins are staff
		return self.is_admin
	
class Category(models.Model):
	name = models.CharField(max_length=100, primary_key=True)
	tags = models.TextField()

	def __str__(self):
		return self.name
	
class Image(models.Model):
	image_id=models.AutoField(primary_key=True)
	title = models.CharField(max_length=100, null=True)
	image = models.ImageField(upload_to='posts/',default="")
	# uploaded_by = models.ForeignKey(AppUser, on_delete=models.CASCADE)
	# uploaded_at = models.DateTimeField(auto_now_add=True)
	def __str__(self):
		return self.title

class BlogPost(models.Model):
	post_id= models.AutoField(primary_key=True)
	author= models.ForeignKey(AppUser, on_delete=models.CASCADE)
	title = models.CharField(max_length=255)
	content = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	cat=models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
	images = models.ForeignKey(Image,on_delete=models.CASCADE, related_name='post_image',null=True)
	# images = models.ManyToManyField(Image, related_name='blog_posts')

	def __str__(self):
		return self.title

class Rating(models.Model):
	rate_id = models.AutoField(primary_key=True)
	post = models.ForeignKey(BlogPost,on_delete=models.CASCADE)
	reader = models.ForeignKey(AppUser, on_delete=models.CASCADE)
	like = models.BooleanField()
	comment = models.TextField()

	def __str__(self):
		return self.post,self.reader

# class Analytics(models.Model):
# 	analysis_id = models.AutoField(primary_key=True)
# 	post=models.ForeignKey(BlogPost, on_delete=models.CASCADE)
# 	reader_count = models.IntegerField()
# 	timestamp = models.TimeField()

# 	def __str__(self):
# 		return self.analysis_id

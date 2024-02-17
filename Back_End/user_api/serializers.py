from django.forms import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import BlogPost, Image, Rating, Category

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
		user_obj.username = clean_data['username']
		user_obj.save()
		return user_obj

class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username')

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'image', 'uploaded_by', 'uploaded_at']

class BlogPostSerializer(serializers.ModelSerializer):
	images = ImageSerializer(many=True, read_only=True)
	class Meta:
		model = BlogPost
		fields = ['post_id','author','Cat','title', 'content', 'created_at', 'updated_at','images']

class RatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['rate_id', 'post', 'reader', 'like','comment']


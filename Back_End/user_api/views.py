from django.contrib.auth import get_user_model, login, logout

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions, status
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
# from django.conf import settings
# from django.core.files.base import ContentFile

from .models import BlogPost,Image,Rating

from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer,BlogPostSerializer, RatePostSerializer, ImageSerializer
from .validations import custom_validation, validate_email, validate_password


class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		# print(serializer.data)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

class BlogPostCreateView(generics.CreateAPIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	# queryset = BlogPost.objects.all()
	serializer_class = BlogPostSerializer

	def perform_create(self, serializer):
        # Access the authenticated user's username
		username = self.request.user.username
		author_instance = get_user_model().objects.get(username=username)
		blog_post=serializer.save(author=author_instance)


class BlogPostUpdateView(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

    def perform_update(self, serializer):
        # Access the authenticated user's username
        username = self.request.user.username
        author_instance = get_user_model().objects.get(username=username)
        serializer.save(author=author_instance)

class BlogPostListView(generics.ListAPIView):
	permission_classes = (permissions.AllowAny,)
	serializer_class = BlogPostSerializer

	def get_queryset(self):
		cat = self.request.query_params.get('cat', None)
		if cat:
			return BlogPost.objects.filter(cat=cat)
		else:
			return BlogPost.objects.all()

class PostListView(generics.RetrieveUpdateDestroyAPIView):
	permission_classes = (permissions.AllowAny,)
	queryset = BlogPost.objects.all()
	serializer_class = BlogPostSerializer
	lookup_field = 'post_id'

class ImageUploadView(APIView):
	permission_classes = (permissions.AllowAny,)
	parser_classes = (MultiPartParser, FormParser)

	def get(self, request, *args, **kwargs):
		posts = Image.objects.all()
		serializer = ImageSerializer(posts, many=True)
		return Response(serializer.data)

	def post(self, request, *args, **kwargs):
		posts_serializer = ImageSerializer(data=request.data)
		if posts_serializer.is_valid():
			posts_serializer.save()
			return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
		else:
			print('error', posts_serializer.errors)
			return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetImageView(APIView):
    def get(self, request, image_id):
        # Retrieve the YourModel instance based on image_id
        your_model_instance = get_object_or_404(Image, pk=image_id)

        # Assuming the YourModel instance has an 'image' field (ImageField)
        image_url = your_model_instance.image.url

        # Return the image URL in the response
        return JsonResponse({'url': image_url})
				
class RatePostView(generics.CreateAPIView):
	permission_classes = (permissions.IsAuthenticated,)
	serializer_class = RatePostSerializer

# class AllPostListView(generics.ListAPIView):
# 	permission_classes = (permissions.AllowAny,)
# 	queryset = BlogPost.objects.all()
# 	serializer_class = BlogPostSerializer

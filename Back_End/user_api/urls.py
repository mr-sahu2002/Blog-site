from django.urls import path
from . import views

urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),

    path('create', views.BlogPostCreateView.as_view(),name='blog'),
    path('create/<int:pk>', views.BlogPostUpdateView.as_view(),name='blog'),
    
    path('posts/', views.BlogPostListView.as_view(), name='post-detail'),
    path('posts/<int:post_id>/', views.PostListView.as_view(), name='post-detail'),
    # path('allposts/', views.AllPostListView.as_view(), name='post-list'),
]


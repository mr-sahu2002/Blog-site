from django.urls import path
from . import views


urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),

    path('create', views.BlogPostCreateView.as_view(),name='blog'),
    path('create/<int:pk>', views.BlogPostUpdateView.as_view(),name='blogbyid'),
    path('upload',views.ImageUploadView.as_view(),name="upload-image"),
    path('get_image_url/<int:image_id>/', views.GetImageView.as_view(), name='get_image_url'),
    
    path('posts/', views.BlogPostListView.as_view(), name='post-detail'),
    path('posts/<int:post_id>/', views.PostListView.as_view(), name='post-detail-by_Id'),
    path('posts/byUser/<int:author_id>/', views.UserPostsView.as_view(), name='user_posts'),

    path('comment/', views.CommentCreateView.as_view(), name='comment'),
    path('post/<int:post_id>/comments/', views.CommentListView.as_view(), name='comment-list-create'),
    path('comment/<int:comment_id>', views.commentDeleteView.as_view(), name='comment-list-create')
]


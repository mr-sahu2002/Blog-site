from django.contrib import admin
from .models import AppUser,BlogPost,Image,Rating,Category

# Register your models here.
admin.site.register(AppUser)
admin.site.register(BlogPost)
admin.site.register(Image)
admin.site.register(Rating)
admin.site.register(Category)

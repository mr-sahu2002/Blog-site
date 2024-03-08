from django.contrib import admin
from .models import AppUser,BlogPost,Image,comment,Category

# Register your models here.
admin.site.register(AppUser)
admin.site.register(BlogPost)
admin.site.register(Image)
admin.site.register(comment)
admin.site.register(Category)
